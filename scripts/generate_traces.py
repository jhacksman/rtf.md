#!/usr/bin/env python3
"""
RTF.md Reasoning Trace Generator

This script generates reasoning trace markdown files for changed files in a repository.
It uses the OpenAI API to analyze code and generate structured reasoning documentation.
"""

import argparse
import os
import sys
import json
import re
from datetime import datetime
import openai

# Configure OpenAI API
openai.api_key = os.environ.get("OPENAI_API_KEY")
if not openai.api_key:
    print("Error: OPENAI_API_KEY environment variable not set")
    sys.exit(1)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="Generate reasoning traces for changed files")
    parser.add_argument("--files", required=True, help="Space-separated list of changed files")
    return parser.parse_args()

def get_file_content(file_path):
    """Read the content of a file."""
    try:
        with open(file_path, "r") as f:
            return f.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def get_file_history(file_path):
    """Get the git history of a file."""
    try:
        import subprocess
        result = subprocess.run(
            ["git", "log", "--follow", "--format=%H %an %ad %s", "--date=iso", file_path],
            capture_output=True, text=True, check=True
        )
        return result.stdout.strip()
    except Exception as e:
        print(f"Error getting history for {file_path}: {e}")
        return ""

def get_related_files(file_path):
    """Find files that are likely related to the given file."""
    try:
        # Get the directory of the file
        dir_path = os.path.dirname(file_path)
        
        # Get all files in the same directory
        files_in_dir = [f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))]
        
        # Filter out the current file and any .md files
        related = [f for f in files_in_dir if f != os.path.basename(file_path) and not f.endswith('.md')]
        
        # Add imports/dependencies if we can detect them
        # This is a simplified approach - a real implementation would parse the file
        # and extract actual imports/dependencies
        
        return related
    except Exception as e:
        print(f"Error finding related files for {file_path}: {e}")
        return []

def detect_file_type(file_path):
    """Detect the type of file based on extension and content."""
    ext = os.path.splitext(file_path)[1].lower()
    
    # Map extensions to file types
    extension_map = {
        '.py': 'Python',
        '.js': 'JavaScript',
        '.jsx': 'React',
        '.ts': 'TypeScript',
        '.tsx': 'React TypeScript',
        '.java': 'Java',
        '.rb': 'Ruby',
        '.go': 'Go',
        '.rs': 'Rust',
        '.php': 'PHP',
        '.c': 'C',
        '.cpp': 'C++',
        '.h': 'C/C++ Header',
        '.cs': 'C#',
        '.html': 'HTML',
        '.css': 'CSS',
        '.scss': 'SCSS',
        '.json': 'JSON',
        '.md': 'Markdown',
        '.sql': 'SQL',
        '.sh': 'Shell',
        '.yaml': 'YAML',
        '.yml': 'YAML',
        '.xml': 'XML',
        '.dockerfile': 'Dockerfile',
    }
    
    return extension_map.get(ext, 'Unknown')

def generate_trace(file_path, content, file_type, history, related_files):
    """Generate a reasoning trace for a file using OpenAI API."""
    try:
        # Create a prompt for the OpenAI API
        prompt = f"""
Generate a reasoning trace for the following {file_type} file: {os.path.basename(file_path)}

File content:
```
{content[:4000]}  # Limit content to avoid token limits
```

Your task is to create a structured reasoning trace document that captures the thought processes, 
decisions, and context behind this code. Use the RTF.md format with appropriate tags.

Include the following sections:
1. A metadata section with author (use "github-actions-bot"), timestamp (current time), version, and related files
2. At least 3-4 relevant tag sections based on what you observe in the code
3. Focus on explaining the reasoning, trade-offs, and decisions that would have led to this implementation

Use these tags as appropriate:
- <metadata>: Basic information about the file
- <exploration>: Approaches that might have been considered
- <trade-off>: Design decisions and their justifications
- <constraint>: System constraints affecting decisions
- <technical-debt>: Shortcuts taken and future improvement plans
- <security>: Security considerations
- <performance-bottleneck>: Performance issues and optimizations
- <edge-case>: Edge cases addressed
- <follow-up>: Future work needed

Related files: {', '.join(related_files)}
File history: {history[:500]}  # Limit history to avoid token limits

Format your response as a complete markdown document that would be saved as .{os.path.basename(file_path)}.md
"""

        # Call the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Use an appropriate model
            messages=[
                {"role": "system", "content": "You are an expert software developer tasked with documenting the reasoning behind code."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=2000,
            temperature=0.7
        )
        
        # Extract the generated trace
        trace = response.choices[0].message.content.strip()
        
        # Ensure the trace starts with a proper heading
        if not trace.startswith("# Reasoning Trace for"):
            trace = f"# Reasoning Trace for {os.path.basename(file_path)}\n\n{trace}"
        
        return trace
    except Exception as e:
        print(f"Error generating trace for {file_path}: {e}")
        return None

def save_trace(file_path, trace):
    """Save the generated trace to a file."""
    try:
        trace_path = f".{file_path}.md"
        os.makedirs(os.path.dirname(trace_path), exist_ok=True)
        
        with open(trace_path, "w") as f:
            f.write(trace)
        
        print(f"Saved reasoning trace to {trace_path}")
        return True
    except Exception as e:
        print(f"Error saving trace for {file_path}: {e}")
        return False

def main():
    """Main function."""
    args = parse_args()
    
    # Get the list of files
    files = args.files.strip().split()
    
    if not files:
        print("No files to process")
        return
    
    success_count = 0
    
    for file_path in files:
        # Skip files that don't exist or are already reasoning traces
        if not os.path.exists(file_path) or file_path.startswith('.') or file_path.endswith('.md'):
            continue
        
        print(f"Processing {file_path}...")
        
        # Get file content
        content = get_file_content(file_path)
        if not content:
            continue
        
        # Get file metadata
        file_type = detect_file_type(file_path)
        history = get_file_history(file_path)
        related_files = get_related_files(file_path)
        
        # Generate trace
        trace = generate_trace(file_path, content, file_type, history, related_files)
        if not trace:
            continue
        
        # Save trace
        if save_trace(file_path, trace):
            success_count += 1
    
    print(f"Generated {success_count} reasoning traces")

if __name__ == "__main__":
    main()
