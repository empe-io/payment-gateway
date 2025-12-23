# Repository Guidelines

## Project Structure & Module Organization
- Current tracked content is `.idea/` (IDE metadata); no source, tests, or assets are committed.
- When adding code, keep a predictable layout: `src/` for implementation, `tests/` for automated tests, `assets/` for static files, `scripts/` for tooling, and `docs/` for design or ADRs.
- Group modules by feature or domain; avoid deep nesting beyond two levels.

## Build, Test, and Development Commands
- No build, run, or test commands are defined yet. Once the stack is chosen, document commands in this file and in the project README.
- Example of how to document: "`make build` builds the binary", "`npm test` runs the unit suite" (replace with actual commands).

## Coding Style & Naming Conventions
- No formatter or linter configuration detected. Add one appropriate to the chosen language and run it before commits.
- Use consistent casing within a language (e.g., `snake_case` files, `PascalCase` types) and prefer descriptive module names such as `user_profile` or `order_service`.

## Testing Guidelines
- No test framework or coverage target is set. When tests are added, place them under `tests/` and name them after the unit under test (e.g., `user_profile_test` or `user_profile.spec`).
- Keep tests deterministic and avoid network calls; use fixtures or mocks.

## Commit & Pull Request Guidelines
- No Git history is present in this repository snapshot, so no existing commit convention is known.
- Use a consistent format (e.g., `type(scope): summary`) and keep messages imperative.
- Pull requests should include a short description, linked issue (if any), and clear verification steps; include screenshots for UI changes.

## Security & Configuration Tips
- Do not commit secrets. Use environment files like `.env` locally and provide a sanitized `.env.example` in the repo.
- Document required configuration and defaults in `docs/` or the README.
