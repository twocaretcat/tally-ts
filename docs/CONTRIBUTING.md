# 🤝 Contributing

Thanks for your interest in contributing to **tally-ts**! This document provides guidelines and instructions for
contributing to the project.

## Reporting Issues

You can [create an issue](https://github.com/twocaretcat/tally-ts/issues) to request a new feature or report a problem
with the project. Make sure a similar issue doesn't already exist.

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

If you have a question about the project, please start a [discussion].

### Security Vulnerabilities

See the [security policy](SECURITY.md) for details on reporting security vulnerabilities.

### Pull Requests

Issues with the `🚦 ready` label are ready to be worked on. If you comment on an issue, I can assign it to you.

Issues with the `🚦 needs triage` label generally need some more information before they can be worked on, but if you
start a [discussion] about it or leave a comment on the issue, I can likely get it ready for you.

If an issue is unclear or you have any questions about how a feature should be implemented, reach out before making any
changes so we can discuss the best way to do it.

## Development Workflow

### Prerequisites

- [Deno](https://deno.land/)
- [Git](https://git-scm.com/) for version control
- A code editor ([VS Codium](https://vscodium.com/) with the
  [Deno extension](https://open-vsx.org/extension/denoland/vscode-deno) is recommended)

### Getting Started

Here's a quick example of how to contribute a new feature or bug fix:

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/tally-ts.git
   cd tally-ts
   ```

2. Create a new branch:

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. Make your changes in the `src/` directory
4. Write or update tests as needed
5. Run the full check suite:

   ```bash
   deno check
   deno lint
   deno fmt
   deno task test
   ```

6. Commit your changes:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. Push and create a pull request:

   ```bash
   git push origin feat/your-feature-name
   ```

See below for more details.

## Checking

We use Deno's built-in tools for checking code quality. Make sure to run these checks before submitting a pull request.

### Checking TypeScript Types

```bash
deno check
```

### Formatting Code

```bash
deno fmt          # Format all files
deno fmt --check  # Check formatting without modifying files
```

### Linting Code

```bash
deno lint
```

## Testing

We use Deno's built-in test runner along with some custom tasks to run tests.

Before submitting a pull request, make sure to run these tests and write new ones if you add new functionality.

### Writing Tests

Tests are located in the [src/\_\_tests\_\_/](../src/__tests__/fixtures/) directory. Most of the unit tests follow a
similar pattern so we use a single [index.spec.ts](../src/__tests__/index.spec.ts) file to load and run test cases for
the main module. The legacy module currently isn't tested.

Individual test cases are located in the [src/\_\_tests\_\_/fixtures/](../src/__tests__/fixtures/) directory and are
organized by locale.

### Generating Test Segments

> [!IMPORTANT]
> You don't need to run this script manually. It gets run automatically when you run the `test` task.
>
> Segment data is also committed to source control so you only need to regenerate it if you modify test inputs or add
> new test cases. If you do need to generate them, you'll need to have a recent version of [Node.js](https://nodejs.org)
> installed.

The behavior of **tally-ts** depends heavily on how `Intl.Segmenter` is implemented by your runtime (and the version of
ICU that it uses). To ensure consistent test results across runtimes, we use Node.js's `Intl.Segmenter` to generate
lists of segments for each test input. Then, we use these lists to mock `Intl.Segmenter` in our tests so that the output
of **tally-ts** is reproducible no matter where the tests are run.

> [!NOTE]
> Node.js is used to generate segment data because it typically has the most recent version of
> [ICU](https://icu.unicode.org/) out of popular runtimes, and it makes more sense to target the latest version of ICU
> than to base expected test results on an older version.

Generate segment data for test inputs:

```bash
deno task test:segments
```

### Running Tests

Run all tests:

```bash
deno task test
```

## Building

We have a custom script to build the package for npm. This script uses [dnt] (Deno to Node Transform) to generate a
Node.js-compatible package in the [npm/](../npm/) directory. No build step is required for JSR.

### Building for npm

Generate a Node.js-compatible package:

```bash
deno task build:npm        # Build with version from deno.json
deno task build:npm 0.2.0  # Build with specific version
```

## Publishing

The package is published to JSR as [@twocaretcat/tally-ts](https://jsr.io/@twocaretcat/tally-ts) and to npm as
[@twocaretcat/tally-ts](https://www.npmjs.com/package/@twocaretcat/tally-ts).

> [!IMPORTANT]
> You don't need to any of these tasks manually. Publishing is automated with
> [Semantic Release](https://semantic-release.gitbook.io/semantic-release) using the
> [publish workflow](../.github/workflows/publish.yml). Semantic Release is configured in
> [release.config.js](../release.config.js).

<details>
<summary>Steps:</summary>

1. Pushes to the `main` branch will trigger the workflow, where we run Semantic Release
2. Commits will trigger new releases based on their type. We use the
   [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/) preset. For example:

   - `feat!:` - Major version bump
   - `feat:` - Minor version bump
   - `fix:` - Patch version bump
   - `docs:` - No version bump

3. If a commit triggers a release, we will:
   1. Update the version in `deno.json` using `deno task version <version>` and push the changes
   2. Run `deno task publish`, which in turn, runs:
      1. `deno task build:npm` to build the package for npm
      2. `deno task publish:jsr` to publish to JSR (we run the npm build first to make sure it is successful)
      3. `deno task publish:npm` to publish to npm
   3. Create a GitHub release with the release notes

</details>

### Updating the Version in [deno.json]

Update the version field in [deno.json] with the provided value:

```bash
deno task version 1.0.0
```

This is used by the publish workflow to bump the version number before publishing.

### Publishing to All Registries

Publish to all registries at once using the `publish` task:

```bash
deno task publish
```

This runs the `build:npm` task first and is used by the publish workflow.

### Publishing to JSR

Publish to the JSR registry:

```bash
deno task publish:jsr
```

This is simply a shorthand for `deno publish --allow-dirty`.

### Publishing to npm

Publish to the npm registry:

```bash
deno task publish:npm
```

This task runs the `build:npm` task first and requires the `npm` CLI to be installed.

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
- If necessary, update the [README](../README.md) and any other applicable files in the [docs/](../docs/) directory

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test additions or modifications
- `chore:` - Maintenance tasks

If you are making a breaking change, add an exclamation mark after the type and a `BREAKING CHANGE:` footer further
explaining the breaking changes for users. For example:

<!-- Example from https://www.conventionalcommits.org/en/v1.0.0/ | MIT -->

```txt
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

## Project Structure

The project is structured as follows:

<!-- Generated with `ls --tree -I node_modules -I .git --icon-theme=unicode -A --group-dirs=first` -->

```bash
📂 .github
├── 📂 ISSUE_TEMPLATE
├── 📂 workflows
📂 .vscode
📂 docs                             # Additional documentation
📂 npm                              # Build output for npm
│                                   # (auto-generated by the `build:npm` task)
├── 📂 esm                          # ESM output
├── 📂 script                       # CJS output
├── 📂 src                          # Source code
📂 scripts                          # Helper scripts
├── 📄 build-npm.ts                 # Build script for npm
├── 📄 generate-segments.mjs        # Script to compute segments for test input strings
├── 📄 update-version.ts            # Script to update deno.json version
📂 src                              # Source code
├── 📂 __tests__                    # Tests
│   ├── 📂 fixtures                 # Test fixtures
│   │   └── 📂 [LOCALE]             # Fixtures for a given locale
│   │       └── 📂 [TEST_CASE_ID]   # A single fixture
│   │           ├── 📄 expected.ts  # Expected outputs for the test case
│   │           ├── 📄 input.mjs    # Input string for the test case
│   │           └── 📄 segments.ts  # Computed segments for the input string
│   │                               # (auto-generated by the `test:segments` task)
│   ├── 📄 index.spec.ts            # Unit tests for index.ts
│   ├── 📄 types.ts                 # Test-only types
│   └── 📄 utils.ts                 # Test-only utilities
├── 📄 classifier.ts                # Module for classifying characters
├── 📄 index.ts                     # Main counter module with `Tally` class
├── 📄 legacy.ts                    # Legacy counter module
└── 📄 types.ts                     # Types
📄 .editorconfig
📄 .gitignore
📄 deno.json                        # Deno config and task definitions
📄 deno.lock
📄 LICENSE
📄 package.json
📄 project-metadata.json
📄 README.md
📄 release.config.js                # Semantic Release config
```

## License

By contributing to this project, you agree that your contributions will be licensed under the project
[license](../LICENSE).

[dnt]: https://github.com/denoland/dnt
[discussion]: https://github.com/twocaretcat/tally-ts/discussions
[deno.json]: ../deno.json
