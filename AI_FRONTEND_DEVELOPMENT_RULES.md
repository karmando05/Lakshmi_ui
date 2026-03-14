# AI Frontend Development Rules

## 1. Purpose

This document defines the rules that **AI systems (LLMs, code
assistants, and automated agents)** must follow when generating or
modifying **frontend code** in this project.

The goal is to ensure that AI-generated code is:

-   Consistent
-   Maintainable
-   Secure
-   Predictable
-   Easy for humans to review

AI-generated code must follow the same standards expected from human
developers.

------------------------------------------------------------------------

# 2. Core Principles

## Deterministic Code

AI must generate **deterministic code**.

Avoid:

-   Random logic
-   Unpredictable side effects
-   Implicit behaviors

All logic must be explicit.

------------------------------------------------------------------------

## Readability Over Cleverness

AI must prioritize:

-   readability
-   maintainability
-   clarity

Avoid:

-   complex one‑liners
-   nested ternaries
-   over‑optimized logic

Example:

Bad:

    const result = condition ? a : b ? c : d;

Good:

    if (condition) return a;

    if (b) return c;

    return d;

------------------------------------------------------------------------

# 3. Project Structure

AI must follow the project structure.

Example:

    frontend/
    │
    ├── components/
    │   ├── ui
    │   ├── shared
    │
    ├── pages/
    │
    ├── hooks/
    │
    ├── services/
    │
    ├── utils/
    │
    ├── styles/
    │
    └── types/

Rules:

-   Components must live inside `components/`
-   Business logic must **not live inside UI components**
-   API calls must live inside `services/`

------------------------------------------------------------------------

# 4. Component Design

Components must follow these rules.

### Single Responsibility

A component must do **one thing only**.

Avoid components that:

-   fetch data
-   render UI
-   handle business logic

Split responsibilities.

Example:

    UserListContainer  -> fetches data
    UserListView       -> renders UI

------------------------------------------------------------------------

### Component Size

AI must avoid large components.

Limits:

-   **Maximum 200 lines**
-   Extract subcomponents if needed

------------------------------------------------------------------------

# 5. State Management

Rules for state:

-   Local UI state → `useState`
-   Shared state → context or global store
-   Server state → data fetching library

Avoid:

-   Prop drilling deeper than 3 levels
-   Global state for local UI behavior

------------------------------------------------------------------------

# 6. Data Fetching

Rules:

-   All API calls must live in `services/`
-   Components must not call fetch directly
-   Use typed responses

Example:

    services/userService.ts

    export async function getUsers() {
      return api.get("/users");
    }

------------------------------------------------------------------------

# 7. Hooks

Custom hooks must be used for:

-   reusable logic
-   side effects
-   data fetching

Example:

    useUsers()
    useAuth()
    useWindowSize()

Rules:

-   Hooks must start with `use`
-   Hooks must not return JSX

------------------------------------------------------------------------

# 8. Styling Rules

Allowed styling strategies:

-   CSS modules
-   Tailwind
-   Styled components

Avoid:

-   inline styles
-   global CSS pollution

Example:

Bad:

    <div style={{color:'red'}}>

Good:

    <div className="errorText">

------------------------------------------------------------------------

# 9. Accessibility

AI must ensure accessibility.

Required:

-   semantic HTML
-   aria labels
-   keyboard navigation

Example:

Bad:

    <div onClick={handleClick}>

Good:

    <button onClick={handleClick}>

------------------------------------------------------------------------

# 10. Performance Rules

AI must avoid performance issues.

Rules:

-   Avoid unnecessary re‑renders
-   Use memoization when needed
-   Lazy load heavy components

Example:

    React.memo()
    useMemo()
    useCallback()

------------------------------------------------------------------------

# 11. Error Handling

UI must handle errors gracefully.

Example:

    if (error) {
      return <ErrorMessage />
    }

Never leave UI stuck in loading states.

------------------------------------------------------------------------

# 12. Security Rules

AI must prevent common vulnerabilities.

Avoid:

-   dangerouslySetInnerHTML
-   injecting raw HTML
-   exposing secrets

Never expose:

-   API keys
-   tokens
-   credentials

------------------------------------------------------------------------

# 13. Naming Conventions

### Components

PascalCase.

Example:

    UserCard
    ProductList
    CheckoutForm

------------------------------------------------------------------------

### Hooks

    useAuth
    useCart
    useProducts

------------------------------------------------------------------------

### Files

    userService.ts
    authHook.ts
    productUtils.ts

------------------------------------------------------------------------

# 14. AI Code Generation Rules

AI must:

-   Follow existing patterns
-   Match the code style already in the repo
-   Never introduce new frameworks without request
-   Never refactor unrelated code

AI must avoid:

-   rewriting large files
-   introducing breaking changes
-   creating duplicate utilities

------------------------------------------------------------------------

# 15. Testing

All logic must be testable.

Rules:

-   Components should be pure when possible
-   Business logic must live outside components

Test targets:

-   hooks
-   services
-   utils

------------------------------------------------------------------------

# 16. Pull Request Rules for AI Code

AI‑generated code must:

-   compile successfully
-   pass linting
-   follow project structure
-   include clear comments if complex

------------------------------------------------------------------------

# 17. Forbidden Patterns

AI must never generate:

-   500+ line components
-   deeply nested JSX
-   inline API calls
-   inline styles
-   global mutable state

------------------------------------------------------------------------

# 18. Final Rule

AI must generate code that a **human developer can understand in less
than 30 seconds**.

If the code requires explanation, it is too complex.
