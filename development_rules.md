# Development Rules

## 1. Purpose

This document defines the development standards, coding guidelines, and
workflow rules for the project.

Goals: - Maintain consistent code quality - Ensure maintainable
architecture - Enable predictable deployments - Improve collaboration
between developers

All contributors must follow these rules.

------------------------------------------------------------------------

# 2. Core Principles

## Simplicity First

Prefer simple solutions over complex ones.

Guidelines: - Clear code \> clever code - Readability \> premature
optimization - Small components \> large monoliths

## Single Responsibility

Every module, class, and function must have a single responsibility.

Avoid: - Large classes - Functions that perform multiple unrelated tasks

## Explicit Over Implicit

Code behavior must be explicit.

Avoid: - Hidden side effects - Magic numbers - Unclear logic

------------------------------------------------------------------------

# 3. Architecture

The project follows a **layered architecture**.

Example structure:

    project/
    │
    ├── api/
    │   ├── controllers/
    │   ├── dto/
    │
    ├── service/
    │   ├── business logic
    │
    ├── domain/
    │   ├── entities
    │   ├── interfaces
    │
    ├── repository/
    │   ├── database access
    │
    ├── infrastructure/
    │   ├── configuration
    │   ├── integrations
    │
    └── tests/

Layer responsibilities:

  Layer            Responsibility
  ---------------- -----------------------
  Controller       Handle HTTP requests
  Service          Business logic
  Repository       Data persistence
  Domain           Core models
  Infrastructure   External integrations

------------------------------------------------------------------------

# 4. Naming Conventions

## Variables

Use descriptive names.

Good examples:

    userEmail
    orderTotal
    ticketCount

Avoid:

    x
    tmp
    data1

## Functions

Functions must clearly describe what they do.

Good:

    calculateTotalPrice()
    generateInvoice()
    validateUserPermissions()

Bad:

    doStuff()
    process()
    handle()

## Classes

Classes should be nouns.

Examples:

    UserService
    OrderRepository
    TicketGenerator

------------------------------------------------------------------------

# 5. Function Rules

Functions should follow these constraints:

-   Maximum **40 lines**
-   Maximum **3 parameters**
-   Perform **one logical task**

Example:

    function createUser(userDto):
        validateUser(userDto)
        user = mapToEntity(userDto)
        repository.save(user)

------------------------------------------------------------------------

# 6. Error Handling

Rules:

-   Never ignore exceptions
-   Always log errors
-   Return meaningful error responses

Example:

    try:
        service.createUser(dto)
    except ValidationException:
        return 400
    except Exception:
        return 500

------------------------------------------------------------------------

# 7. Logging

Guidelines:

-   Do not use console logs in production
-   Log important business events
-   Avoid logging sensitive information

Examples:

    UserCreated
    OrderProcessed
    PaymentFailed

------------------------------------------------------------------------

# 8. Git Workflow

The project uses **Git Flow Lite**.

Branches:

  Branch       Purpose
  ------------ --------------
  main         Production
  develop      Integration
  feature/\*   New features
  fix/\*       Bug fixes

Branch naming examples:

    feature/user-authentication
    feature/payment-api
    fix/login-validation
    fix/order-calculation

------------------------------------------------------------------------

# 9. Commit Rules

Use **Conventional Commits**.

Format:

    type(scope): description

Examples:

    feat(auth): add JWT authentication
    fix(order): correct tax calculation
    refactor(user): simplify validation logic
    docs(api): update endpoint documentation

------------------------------------------------------------------------

# 10. Pull Request Rules

Each Pull Request must:

-   Include a clear description
-   Reference the related issue
-   Pass CI checks
-   Include tests when applicable

Checklist:

-   [ ] Code builds successfully
-   [ ] Tests pass
-   [ ] No debug logs
-   [ ] No temporary code
-   [ ] Documentation updated

------------------------------------------------------------------------

# 11. Testing

Test types:

  Type                Purpose
  ------------------- ----------------------------
  Unit Tests          Validate business logic
  Integration Tests   Validate system components
  End-to-End Tests    Validate user flows

Minimum test coverage:

    80%

Critical modules should target:

    90%+

------------------------------------------------------------------------

# 12. Security

Never commit:

-   passwords
-   API keys
-   private tokens

Use:

    .env files
    environment variables
    secret managers

Sensitive configuration must always be externalized.

------------------------------------------------------------------------

# 13. Dependencies

Rules:

-   Avoid unnecessary dependencies
-   Prefer actively maintained libraries
-   Regularly check for vulnerabilities

------------------------------------------------------------------------

# 14. Documentation

All public modules must include:

-   Description
-   Inputs and outputs
-   Example usage

API endpoints should be documented using:

    OpenAPI / Swagger

------------------------------------------------------------------------

# 15. CI/CD

Before merging code:

1.  Build must succeed
2.  Tests must pass
3.  Linter must pass
4.  Security scan must pass

Pipeline stages:

    lint
    build
    test
    security-scan
    deploy

------------------------------------------------------------------------

# 16. Code Review

Reviewers must verify:

-   Architecture compliance
-   Code readability
-   Performance impact
-   Security concerns

Avoid approving code that:

-   Breaks conventions
-   Is difficult to understand
-   Lacks tests

------------------------------------------------------------------------

# 17. Performance

Optimization rules:

-   Measure before optimizing
-   Identify bottlenecks first

Typical bottlenecks:

-   Database queries
-   Network calls
-   Memory usage

------------------------------------------------------------------------

# 18. Definition of Done

A feature is considered complete when:

-   Code implemented
-   Tests written
-   Documentation updated
-   Code reviewed
-   CI pipeline passes
-   Deployed to staging

------------------------------------------------------------------------

# 19. Technical Debt

Technical debt must be:

-   Documented
-   Tracked
-   Prioritized

Create tickets when shortcuts are taken.

------------------------------------------------------------------------

# 20. Final Rule

Code should be written for **future developers**, not only the current
one.

The next developer maintaining your code might be you.

------------------------------------------------------------------------

# 21. Mock Data Location

All frontend mock information used for local-only development must be stored under:

    /lib/data/mock

Do not place mock users, sessions, or auth fixtures outside this folder.
