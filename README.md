# RTF.md: Reasoning Trace Framework

## Project Overview

RTF.md is a comprehensive framework for capturing the reasoning traces behind every file in a code repository. Unlike traditional documentation, RTF.md preserves the actual thought processes, decision pathways, and context that led to code creation and changes, addressing technical debt by making implicit knowledge explicit.

## Core Concept

For every file in a repository, RTF.md creates a corresponding reasoning trace file in a centralized `rtfmd` directory. These files document the complete reasoning journey using a structured tag system inspired by AI reasoning models but adapted for the messy reality of software development.

## Repository Structure

```
repository/
├── src/
│   ├── components/
│   │   └── Button.jsx
│   └── utils/
│       └── formatDate.js
├── rtfmd/
│   ├── files/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── Button.jsx.md
│   │   │   └── utils/
│   │   │       └── formatDate.js.md
│   ├── knowledge/
│   │   ├── frontend/
│   │   │   └── react-component-patterns.md
│   │   ├── security/
│   │   │   └── authentication-best-practices.md
│   │   └── standards/
│   │       └── code-style-guide.md
│   └── decisions/
│       └── architectural-decisions.md
└── README.md
```

The `rtfmd` directory contains:

1. **files/**: Mirrors the repository structure with reasoning trace files for each code file
2. **knowledge/**: Domain-specific knowledge documents organized by category
3. **decisions/**: High-level architectural and design decision records

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

### Human Priors Tags
```markdown
<domain-knowledge>
  [Specialized knowledge applied]
  [Industry-specific considerations]
  [How domain expertise influenced decisions]
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

### Knowledge Reference Tags
```markdown
<knowledge-refs>
  [Link to relevant knowledge document](/rtfmd/knowledge/domain/document.md) - Last updated YYYY-MM-DD
  [Link to architectural decision](/rtfmd/decisions/decision-record.md) - Last updated YYYY-MM-DD
</knowledge-refs>
```

## Implementation Approach

RTF.md is designed to be implemented using:

1. **LLM Integration**: Large language models with access to repository context generate and maintain reasoning traces.

2. **GitHub Workflow**: Reasoning traces are created or updated alongside commits through GitHub actions or hooks.

3. **Progressive Implementation**: Start with critical files and gradually expand coverage across repositories.

4. **Version History**: Maintain historical reasoning while adding new insights, preserving the evolution of thought.

## Usage Pattern

A typical RTF.md file contains only the relevant tags for that particular file and situation. Tags are used contextually rather than trying to fill every tag for every file.

Example pattern for a bug fix:

```markdown
<metadata>
  author: developer-id-123
  timestamp: 2025-03-15T14:32:00Z
  prompt: "Fix authentication failure on mobile devices"
  requestor: product-manager-456
  requestor-context: "High priority, customers are reporting login failures"
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

<intuition>
  Had a hunch that the orientation might be related because similar issues
  occurred in previous projects with responsive designs.
  Validated by testing in both orientations explicitly.
</intuition>

<knowledge-refs>
  [Mobile Viewport Best Practices](/rtfmd/knowledge/frontend/mobile-viewport.md) - Last updated 2025-01-10
</knowledge-refs>

<follow-up>
  Need comprehensive testing across device types.
  Consider refactoring entire validation module.
</follow-up>
```

## Knowledge Repository

The `/rtfmd/knowledge/` directory contains domain-specific information relevant to the codebase:

1. **Technology Guides**: Best practices, patterns, and conventions for technologies used in the project

2. **Domain Models**: Explanations of business domain concepts and their relationships

3. **API References**: Current documentation for internal/external APIs used by the codebase

4. **Design Standards**: UI/UX guidelines, accessibility standards, and design systems

Each knowledge document follows a similar tagged structure but focuses on providing context rather than reasoning traces. All knowledge documents include a "Last Updated" timestamp to provide temporal context.

## Benefits

1. **Root Cause Preservation**: Captures why changes were made, not just what changed
2. **Learning from Failures**: Documents bugs, errors, and dead ends to prevent repetition
3. **Context Transfer**: New developers understand not just code but thinking behind it
4. **LLM Enhancement**: Provides rich context for AI systems to make better predictions
5. **Historical Intelligence**: Builds a repository of problem-solving approaches
6. **Domain Knowledge Preservation**: Captures specialized expertise that might otherwise be lost

## Getting Started

To implement RTF.md in your repository:

1. Create the initial directory structure:
   ```bash
   mkdir -p rtfmd/files rtfmd/knowledge rtfmd/decisions
   ```

2. Create a `.github/workflows/rtf.yml` file that triggers reasoning trace generation
   ```yaml
   name: Generate RTF.md Traces
   on:
     push:
       branches: [ main, develop ]
   jobs:
     generate-traces:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Generate Reasoning Traces
           uses: rtfmd/github-action@v1
           with:
             files: "changed"
             llm-provider: "openai"
             api-key: ${{ secrets.LLM_API_KEY }}
   ```

3. Configure the workflow to use an LLM to generate traces for each committed file
4. Review and enhance generated traces during code review
5. Use the traces when onboarding new developers or making significant changes

## Examples

See the [examples/](examples/) directory for sample reasoning traces across different scenarios:
- Bug fixes
- Feature implementations
- Refactoring efforts
- Performance optimizations

## Contributing

Contributions to RTF.md are welcome! We're particularly interested in:
- Real-world experiences implementing the framework
- Additional tag suggestions based on development scenarios
- Integration tools for different development environments
- Case studies of how RTF.md improved development processes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
