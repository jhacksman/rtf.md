# RTF.md – Reasoning Trace Framework in Markdown

<p align="center">
  <img src="assets/rtf.md.logo.png" alt="RTF.md Logo" width="250"/>
</p>

## Project Vision

RTF.md is not a separate documentation system like traditional ADRs—it is a **shadow file system** that lives alongside your code. For every file in your repository, a corresponding reasoning trace file is automatically maintained in the centralized `rtfmd/` folder. These "shadow files" capture the thought process, context, and decision-making behind every code change.

Language models (LMs) are our primary mechanism for creating and updating these reasoning traces. When an LM processes a repository, it uses the instruction context provided by the project (including prompts, specifications, and previous traces) to generate a detailed rationale for changes. Crucially, the LM is designed to recognize the presence of the `rtfmd/` folder in the repository root; this signals that additional context is available and should be incorporated into the reasoning process.

## Centralized Shadow File System

The reasoning traces for each file are stored in a dedicated `rtfmd/` folder that mirrors the repository structure. For example:

```plaintext
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

- **rtfmd/files/**: Mirrors the repository's structure, with each source file having an associated reasoning trace file.
- **rtfmd/knowledge/**: Contains domain-specific knowledge and best practices.
- **rtfmd/decisions/**: Stores high-level architectural decisions and design records.

## Automated Reasoning Trace Generation via Language Models

Our framework relies on LMs to generate, update, and refine reasoning traces based on full repository context. Key aspects include:

- **Automatic Updates:** Every time a code file is changed, the LM automatically generates or updates the corresponding shadow file in `rtfmd/files/` to document the reasoning behind the change.
- **Context Enrichment:** When the LM encounters the `rtfmd/` folder at the repository root, it pulls in additional context—such as domain knowledge, past decisions, and style guidelines—to inform its generated reasoning trace.
- **Issue Resolution Updates:** If an issue is resolved, the LM is instructed (via its prompt framework) to append new context or follow-up notes to the reasoning trace, ensuring that the documentation reflects the current state of the project.

This LM-driven process reduces manual overhead and ensures that the rationale for code changes evolves alongside the code.

## Comprehensive Tag System

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

## Knowledge Repository

The `/rtfmd/knowledge/` directory contains domain-specific information relevant to the codebase:

1. **Technology Guides**: Best practices, patterns, and conventions for technologies used in the project

2. **Domain Models**: Explanations of business domain concepts and their relationships

3. **API References**: Current documentation for internal/external APIs used by the codebase

4. **Design Standards**: UI/UX guidelines, accessibility standards, and design systems

Each knowledge document follows a similar tagged structure but focuses on providing context rather than reasoning traces. All knowledge documents include a "Last Updated" timestamp to provide temporal context.

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

## Implementation Approach

RTF.md is designed to be implemented using:

1. **LM Integration**: Large language models with access to repository context generate and maintain reasoning traces.

2. **Progressive Implementation**: Start with critical files and gradually expand coverage across repositories.

3. **Version History**: Maintain historical reasoning while adding new insights, preserving the evolution of thought.

## Benefits

1. **Root Cause Preservation**: Captures why changes were made, not just what changed
2. **Learning from Failures**: Documents bugs, errors, and dead ends to prevent repetition
3. **Context Transfer**: New developers understand not just code but thinking behind it
4. **LM Enhancement**: Provides rich context for AI systems to make better predictions
5. **Historical Intelligence**: Builds a repository of problem-solving approaches
6. **Domain Knowledge Preservation**: Captures specialized expertise that might otherwise be lost

## Getting Started

To implement RTF.md in your repository:

1. Create the initial directory structure:
   ```bash
   mkdir -p rtfmd/files rtfmd/knowledge rtfmd/decisions rtfmd/assets
   ```

2. Add your logo to the assets directory:
   ```bash
   # Save your logo as rtfmd/assets/rtfmd-logo.png
   ```

3. Configure your LM to recognize and utilize the `rtfmd` folder structure
4. Begin documenting reasoning traces for your most critical or complex files
5. Gradually expand coverage as you develop familiarity with the framework

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
- Integration tools for different LM environments
- Case studies of how RTF.md improved development processes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
