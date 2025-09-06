# Release v0.1

This is the initial release of the viatable QR ordering system proof-of-concept.

## ✨ New Features
- **New Root Page**: A new application root page (`/`) has been created to serve as a directory, providing links to all available sample pages.
- **Restored Landing Page**: The customer landing page (`/qo-c-001`) has been restored to its full, intended design, replacing a simplified debugging version.

## 🐛 Bug Fixes & Refactoring
- **Build Stabilization**: Fixed a large number of TypeScript errors that were preventing the project from building successfully. This included removing dozens of unused variables and imports and adding proper type definitions across the entire codebase.
- **Routing Fix**: Corrected the application's entry point (`src/main.tsx`) to properly initialize the router, ensuring that navigation and page rendering work as expected.
