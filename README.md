# RTF.md: Reasoning Trace Framework

## Project Overview

RTF.md is a comprehensive framework for capturing the reasoning traces behind every file in a GitHub repository. Unlike traditional documentation, RTF.md preserves the actual thought processes, decision pathways, and context that led to code creation and changes, addressing technical debt by making implicit knowledge explicit.

## Core Concept

For every file in a repository, RTF.md creates a corresponding hidden file (e.g., `.main.py.md` for `main.py`) that documents the complete reasoning journey using a structured tag system. This system is inspired by AI reasoning models but adapted for the messy reality of software development.

## Tag System

The RTF.md tag system is organized into categories that reflect the actual experiences and thought processes in development:

### Metadata Tags
```markdown
<metadata>
  author: [Author Name/ID]
  timestamp: [ISO DateTime]
  version: [Version]
  related-files: [List of related files]
  prompt: [Original request/prompt that led to this code]
  requestor: [Human/LM who requested the change]
  requestor-context: [Urgency, mood, constraints of request]
</metadata>
```

### Process Tags
```markdown
<exploration>
  [Initial approaches considered]
  [Thought processes during exploration]
  [Resources consulted]
</exploration>

<attempt>
  [Implementation attempts with rationale]
  [What worked and what didn't]
</attempt>

<debugging>
  [Debugging process]
  [Issues encountered and how they were identified]
  [Solutions tried]
</debugging>

<refactor-reason>
  [Why code was refactored]
  [What improved after refactoring]
</refactor-reason>
```

### Issue Tags
```markdown
<bug>
  [Bug description]
  [Root cause analysis]
  [Fix implementation]
</bug>

<edge-case>
  [Edge case description]
  [How it was discovered]
  [Implementation approach]
</edge-case>

<technical-debt>
  [Shortcuts taken]
  [Justification]
  [Future improvement plan]
</technical-debt>

<performance-bottleneck>
  [Performance issue identified]
  [Analysis process]
  [Optimization strategy]
</performance-bottleneck>
```

### Reasoning Tags
```markdown
<assumption>
  [Critical assumptions made]
  [Validation approach]
</assumption>

<trade-off>
  [Options considered]
  [Trade-offs made]
  [Justification for choices]
</trade-off>

<constraint>
  [System constraints affecting decisions]
  [How constraints were addressed]
</constraint>

<insight>
  [Key realizations]
  [How they affected implementation]
</insight>
```

### Context Tags
```markdown
<dependency-issue>
  [Problems with dependencies]
  [Workarounds implemented]
</dependency-issue>

<breaking-change>
  [Breaking changes made]
  [Migration strategy]
</breaking-change>

<legacy-accommodation>
  [Legacy code accommodations]
  [Challenges and solutions]
</legacy-accommodation>
```

### Code Quality Tags
```markdown
<code-convention>
  [Coding standards followed]
  [Style decisions made]
  [Linting considerations]
</code-convention>

<testing-strategy>
  [Test approach chosen]
  [Coverage considerations]
  [Edge cases specifically tested]
</testing-strategy>

<security>
  [Security considerations]
  [Vulnerability mitigations]
  [Authentication/authorization decisions]
</security>
```

### Collaboration Tags
```markdown
<code-review-feedback>
  [Feedback received]
  [Changes made in response]
  [Justification for accepting/rejecting feedback]
</code-review-feedback>

<pair-programming>
  [Collaborative insights]
  [Role distribution]
  [Consensus building process]
</pair-programming>
```

### Learning Tags
```markdown
<pattern-recognition>
  [Design patterns identified]
  [How patterns were applied]
  [Pattern adaptation details]
</pattern-recognition>

<knowledge-gap>
  [Areas where knowledge was lacking]
  [How information was obtained]
  [Learning resources used]
</knowledge-gap>
```

### Human Priors Tags
```markdown
<domain-knowledge>
  [Specialized knowledge applied]
  [Industry-specific considerations]
  [How domain expertise influenced decisions]
  [Links to /knowledge/domain-specific-docs.md]
</domain-knowledge>

<mental-model>
  [Conceptual frameworks used]
  [How mental models guided implementation]
  [Evolution of understanding during development]
</mental-model>

<intuition>
  [Gut feelings that influenced decisions]
  [How intuition was validated or disproven]
  [Experience-based shortcuts taken]
</intuition>
```

### Emotional/Situational Tags
```markdown
<frustration>
  [Sources of frustration]
  [How they were overcome]
</frustration>

<uncertainty>
  [Areas of uncertainty]
  [How decisions were made despite uncertainty]
</uncertainty>

<pressure>
  [Time or other pressures]
  [Impact on implementation]
</pressure>

<aha-moment>
  [Breakthrough realizations]
  [How they changed the approach]
</aha-moment>
```

### Future-Oriented Tags
```markdown
<todo>
  [Pending tasks]
  [Priority level]
</todo>

<known-limitation>
  [Known limitations]
  [Potential future solutions]
</known-limitation>

<follow-up>
  [Follow-up work needed]
  [Dependencies and prerequisites]
</follow-up>
```

## Implementation Approach

RTF.md is designed to be implemented using:

1. **LLM Integration**: Large language models with access to repository context generate and maintain reasoning traces.

2. **GitHub Workflow**: Reasoning traces are created or updated alongside commits through GitHub actions or hooks.

3. **Progressive Implementation**: Start with critical files and gradually expand coverage across repositories.

4. **Version History**: Maintain historical reasoning while adding new insights, preserving the evolution of thought.

## Usage Pattern

A typical RTF.md file contains only the relevant tags for that particular file and situation. Tags are used contextually rather than trying to fill every tag for every file.

### Example: Bug Fix with Knowledge Reference

```markdown
<metadata>
  author: developer-id-123
  timestamp: 2025-03-15T14:32:00Z
  prompt: "Fix authentication failure on mobile devices"
</metadata>

<bug>
  Mobile authentication fails when device is in landscape orientation.
  Root cause: Input validation assumes portrait dimensions.
  Fix: Implemented responsive validation that adapts to device orientation.
</bug>

<debugging>
  Initially suspected JWT token expiration.
  Logs showed valid tokens being rejected.
  Device testing revealed orientation correlation.
  Traced to validation function in auth_helper.js.
</debugging>

<edge-case>
  Tablets with unusual aspect ratios were still failing.
  Added dedicated tablet detection logic.
</edge-case>

<domain-knowledge>
  Applied OAuth 2.0 best practices for token validation.
  Implemented PKCE extension for public clients as recommended.
  [See OAuth 2.0 implementation guide](/knowledge/api/oauth2-spec-2025-03-18.md)
</domain-knowledge>

<security>
  Implemented password hashing with BCrypt.
  Added input validation to prevent SQL injection.
  Used HTTPS for all API endpoints.
</security>

<code-review-feedback>
  Reviewer suggested adding more robust error handling.
  Added try/catch blocks with specific error messages.
</code-review-feedback>

<follow-up>
  Need comprehensive testing across device types.
  Consider refactoring entire validation module.
</follow-up>
```

## Benefits

1. **Root Cause Preservation**: Captures why changes were made, not just what changed
2. **Learning from Failures**: Documents bugs, errors, and dead ends to prevent repetition
3. **Context Transfer**: New developers understand not just code but thinking behind it
4. **LLM Enhancement**: Provides rich context for AI systems to make better predictions
5. **Historical Intelligence**: Builds a repository of problem-solving approaches

## Getting Started

To implement RTF.md in your repository:

1. Create a `.github/workflows/rtf.yml` file that triggers reasoning trace generation
2. Configure the workflow to use an LLM to generate traces for each committed file
3. Review and enhance generated traces during code review
4. Use the traces when onboarding new developers or making significant changes

### GitHub Actions Implementation

Here's an example GitHub Actions workflow that automatically generates reasoning traces for changed files:

```yaml
name: Generate Reasoning Traces
on:
  push:
    branches: [ main ]
  pull_request:
    types: [ opened, synchronize ]
    branches: [ main ]
    
jobs:
  generate-traces:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Fetch all history for proper diff analysis
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
          
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install openai
          
      - name: Identify changed files
        id: changed-files
        run: |
          if [[ "${{ github.event_name }}" == "pull_request" ]]; then
            # For PRs, compare with the base branch
            echo "CHANGED_FILES=$(git diff --name-only ${{ github.event.pull_request.base.sha }} ${{ github.sha }} | grep -v '\.md$' | tr '\n' ' ')" >> $GITHUB_ENV
          else
            # For pushes, compare with the previous commit
            echo "CHANGED_FILES=$(git diff --name-only HEAD^ HEAD | grep -v '\.md$' | tr '\n' ' ')" >> $GITHUB_ENV
          fi
          
      - name: Generate reasoning traces
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          python scripts/generate_traces.py --files "${{ env.CHANGED_FILES }}"
          
      - name: Commit and push reasoning traces
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "GitHub Actions"
          
          # Stage only the generated .md files
          for file in ${{ env.CHANGED_FILES }}; do
            trace_file=".${file}.md"
            if [ -f "$trace_file" ]; then
              git add "$trace_file"
            fi
          done
          
          # Only commit if there are changes
          if git diff --staged --quiet; then
            echo "No reasoning traces to commit"
          else
            git commit -m "Add reasoning traces for changed files [skip ci]"
            git push
          fi
```

This workflow:
1. Triggers on pushes to main and pull requests
2. Identifies files that have changed (excluding .md files)
3. Calls a Python script to generate reasoning traces using OpenAI's API
4. Commits and pushes only the generated trace files

You'll need to create the `scripts/generate_traces.py` script that uses the OpenAI API to generate reasoning traces based on file content and context.

## Examples

See the [examples/](examples/) directory for sample reasoning traces across different scenarios:
- Bug fixes
- Feature implementations
- Refactoring efforts
- Performance optimizations

### Historical Evolution Example

The [examples/historical-evolution/](examples/historical-evolution/) directory demonstrates how reasoning traces evolve over time as code changes and understanding deepens:

- **Version 1.0.0**: Initial implementation with basic JWT authentication
- **Version 1.1.0**: Bug fix for token expiration and improved error handling
- **Version 2.0.0**: Major refactoring with secure storage and token refresh

This example shows how the reasoning trace grows richer over time, capturing:
- The evolution of understanding (from simple token storage to complete security model)
- How technical debt is addressed across versions
- How new knowledge is incorporated into the codebase
- The progression of code quality and security considerations

## Contributing

Contributions to RTF.md are welcome! We're particularly interested in:
- Real-world experiences implementing the framework
- Additional tag suggestions based on development scenarios
- Integration tools for different development environments
- Case studies of how RTF.md improved development processes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
