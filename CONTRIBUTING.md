# Contributing to Kungnection Chat App

Thank you for your interest in contributing to Kungnection! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/Seanachan/kungnection-chat-app.git
   cd kungnection-chat-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Code Style Guidelines

### TypeScript/React Code Style

- Use functional components with hooks
- Use TypeScript for type safety
- Follow React best practices for component composition
- Use CSS Modules for styling

### Naming Conventions

- Components: `PascalCase` (e.g., `ChatInterface.tsx`)
- Hooks: `camelCase` with `use` prefix (e.g., `useAuth`)
- CSS Modules: `camelCase` for class names
- Types/Interfaces: `PascalCase`

### File Organization

- Keep components focused and single-purpose
- Co-locate CSS modules with their components when possible
- Use the `types/` directory for shared type definitions

## Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code style guidelines

3. Ensure the code passes linting and builds:
   ```bash
   npm run lint
   npm run build
   ```

4. Commit your changes with clear, descriptive messages:
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. Push to your branch and create a Pull Request

### Commit Message Format

Use conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Reporting Issues

When reporting issues, please include:
- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## Questions?

Feel free to open an issue for any questions about contributing.
