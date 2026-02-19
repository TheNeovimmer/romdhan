# Contribution Guidelines

Thank you for your interest in contributing to Romdhan! This document provides guidelines for contributing to this project.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to:
- Being respectful and inclusive
- Welcoming newcomers
- Focusing on constructive feedback
- Maintaining a harassment-free experience for everyone

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported.

When creating a bug report, please include:
- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (commands used, expected vs actual output)
- **Include your environment details** (OS, Node version, npm version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples** to demonstrate the enhancement
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` for your feature
3. Make your changes
4. Ensure your code follows the existing style
5. Add or update tests as needed
6. Update documentation if necessary
7. Submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/TheNeovimmer/romdhan.git

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run linter
npm run lint

# Format code
npm run format
```

## Style Guidelines

### TypeScript Style Guide

- Use TypeScript strict mode
- Use meaningful variable and function names
- Add JSDoc comments for functions and classes
- Use async/await instead of callbacks
- Handle errors properly with try/catch

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Commit Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add support for custom calculation methods`

## Testing

- Test your changes locally before submitting
- Ensure the CLI works on different operating systems if possible
- Test edge cases and error handling

## Documentation

- Update the README.md if you add new features
- Update CHANGELOG.md following the existing format
- Add comments to complex code sections
- Update help text in commands if needed

## Review Process

- All submissions require review before being merged
- Be responsive to feedback and make requested changes
- Maintain a professional and respectful tone in discussions

## Questions?

Feel free to open an issue with your question or contact the maintainers.

Thank you for contributing! 🌙
