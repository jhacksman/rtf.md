# Knowledge Repository

This directory contains domain-specific knowledge documents that can be referenced by reasoning traces throughout the codebase.

## Purpose

The knowledge repository serves as a centralized location for:

1. **Domain-Specific Documentation**: Technical specifications, API references, and industry standards
2. **Research Findings**: Summaries of research that influenced development decisions
3. **Best Practices**: Documented patterns and approaches for common problems
4. **Historical Context**: Background information on why certain architectural decisions were made

## Usage

Knowledge documents should be:
- Dated to indicate when the information was current
- Categorized by domain or technology
- Referenced from reasoning traces using relative links
- Updated when new information becomes available

## Structure

```
/knowledge/
  ├── api/                  # API documentation and specifications
  ├── architecture/         # System architecture decisions and patterns
  ├── domain/               # Domain-specific knowledge
  ├── research/             # Research findings and papers
  └── standards/            # Coding standards and best practices
```

## Linking from Reasoning Traces

When referencing knowledge documents in reasoning traces, use relative links:

```markdown
<domain-knowledge>
  Applied OAuth 2.0 authorization flow based on security best practices
  [See OAuth 2.0 implementation guide](/knowledge/security/oauth2-guide.md)
</domain-knowledge>
```

This creates a traceable connection between code decisions and their knowledge foundation.
