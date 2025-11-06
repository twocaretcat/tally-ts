# 🤝 Contributing

Thanks for your interest in contributing to **tally-ts**! This document provides guidelines and instructions for
contributing to the project.

## Reporting Issues

### Feature Requests

For feature requests, please describe:

- The problem you're trying to solve
- Your proposed solution
- Any alternative solutions you've considered
- Examples of how the feature would be used

### Bug Reports

When reporting bugs, please include:

- A clear description of the issue
- Steps to reproduce
- Expected behavior vs actual behavior
- Your JS runtime and version (ex. Node 24.1.1)
- Code samples or test cases demonstrating the issue

### Questions

For questions, please use the [Discussions](https://github.com/twocaretcat/tally-ts/discussions) section.

### Security Vulnerabilities

See [SECURITY.md](SECURITY.md) for details on reporting security vulnerabilities.

## Development Setup

### Prerequisites

- [Deno](https://deno.land/)
- Git for version control
- A code editor (VS Code with the Deno extension is recommended)

### Getting Started

**Fork and clone the repository:**

```bash
git clone https://github.com/YOUR_USERNAME/tally-ts.git
cd tally-ts
```

## Project Structure

```
tally-ts/
├── src/
│   ├── index.ts      # Main export and modern API
│   └── legacy.ts     # Legacy API for backwards compatibility
├── scripts/
│   └── build-npm.ts  # NPM build script using DNT
├── npm/              # NPM package output directory
├── deno.json         # Deno configuration and tasks
└── README.md
```

## Development Workflow

### Running Commands

**tally-ts** uses Deno's built-in tooling. Here are some of the available commands:

#### Type Checking

```bash
deno check
```

Runs TypeScript type checking on all source files.

#### Formatting Code

```bash
deno fmt          # Format all files
deno fmt --check  # Check formatting without modifying files
```

Uses Deno's built-in formatter (configured in `deno.json`).

#### Linting

```bash
deno lint
```

Runs Deno's linter with recommended rules.

#### Running Tests

```bash
deno test                    # Run all tests
deno test --watch            # Run tests in watch mode
deno test src/index.test.ts  # Run specific test file
```

#### Building for NPM

```bash
deno task build:npm        # Build with version from deno.json
deno task build:npm 0.2.0  # Build with specific version
```

Generates a Node.js-compatible package in the `npm/` directory.

### Making Changes

1. **Create a new branch:**

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** in the `src/` directory
3. **Write or update tests** as needed
4. **Run the full check suite:**

   ```bash
   deno check
   deno lint
   deno fmt
   deno test
   ```

5. **Commit your changes:**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `refactor:` - Code refactoring
   - `test:` - Test additions or modifications
   - `chore:` - Maintenance tasks

6. **Push and create a pull request:**

   ```bash
   git push origin feat/your-feature-name
   ```

## Code Style Guidelines

See the existing source for examples of how to write code that fits with the project's style.

### TypeScript Best Practices

- Use explicit type annotations for function parameters and return types
- Avoid `any` type unless absolutely necessary

### Formatting

- Use `deno fmt` or the Deno extension in your code editor and you should be good
- Compared to the defaults, this project uses tabs, single quotes, and a larger line width of 120 characters

### Documentation

- Add JSDoc comments for all exported functions and types
- Keep comments up-to-date with code changes

## Testing

### Writing Tests

- Place test files in the `src/__tests__/` directory with a `spec.ts` extension
- Use Deno's built-in test runner
- Aim for high test coverage of new features

## Publishing

### JSR (Deno Package Registry)

The package is published to JSR as `@twocaretcat/tally-ts`.

**Maintainers only:**

```bash
# Update version in deno.json first
deno publish --dry-run  # Test the publish
deno publish            # Publish to JSR
```

### NPM

The package is also published to NPM as `tally-ts` using DNT (Deno to Node Transform).

**Maintainers only:**

```bash
# Build the NPM package
deno task build:npm 1.0.0

# Navigate to npm directory and publish
cd npm
npm publish
cd ..
```

## License

By contributing to **tally-ts**, you agree that your contributions will be licensed under the MIT License.
