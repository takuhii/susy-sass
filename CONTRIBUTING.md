# Contributing to Susy-sass

Thank you for your interest in contributing to Susy-sass! This document provides guidelines and instructions for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/susy-sass.git`
3. Install dependencies: `npm install`
4. Run tests to make sure everything works: `npm test`

## Development Workflow

### Testing

We use a Node.js-based testing approach to verify that both the legacy (@import) and modern (@use) syntax work correctly:

```bash
npm test
```

### Code Style

- Follow the existing code style in the project
- Use 2 spaces for indentation in SCSS files
- Include comments for complex functionality

### Making Changes

1. Create a new branch for your changes: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests to ensure your changes don't break existing functionality: `npm test`
4. Commit your changes with a descriptive commit message
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a pull request

## Pull Request Guidelines

- Provide a clear description of the problem and solution
- Include any relevant issue numbers in the PR description
- Make sure all tests pass
- Keep changes focused - submit separate PRs for unrelated changes

## Working with Sass Files

The project structure is organized as follows:

- `sass/_susy.scss` - Main entry point for legacy syntax
- `sass/_susy-modern.scss` - Entry point for modern syntax
- `sass/susy/` - Core functionality

When modifying Sass files:

1. Ensure compatibility with both legacy and modern syntax
2. Test changes with both import approaches
3. Be mindful of Sass deprecation warnings

## License

By contributing to Susy-sass, you agree that your contributions will be licensed under the project's BSD-3-Clause license.
