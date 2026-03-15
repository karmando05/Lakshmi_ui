# Lakshmi_ui

Online course platform for entrepreneurs.

## Suggested Next.js data architecture (mock-first, API-ready)

```text
app/
  page.tsx                                # Route entry: orchestrates data loading
src/
  domain/
    models/
      course.ts                           # Core Course type
      testimonial.ts                      # Core Testimonial type
  data/
    mocks/
      homepage.mock.ts                    # Raw mock datasets
    repositories/
      homepage.repository.ts              # Repository contract + mock implementation
  features/
    home/
      components/
        home-page-view.tsx                # Pure UI component (presentation)
      services/
        get-home-page-data.ts             # Feature-level data access service
      types/
        home-page-data.ts                 # Aggregated view model for the page
```

## How homepage data is loaded now

1. `app/page.tsx` calls `getHomePageData()`.
2. `getHomePageData()` uses a `HomePageRepository` implementation.
3. `MockHomePageRepository` returns `featuredCourses` and `testimonials` from mock files.
4. `HomePageView` receives data as props and renders UI only.

## How to switch to real backend later

Add a new repository implementation without changing UI code:

- Keep `HomePageRepository` interface as-is.
- Replace `MockHomePageRepository` with `ApiHomePageRepository` that calls your REST/GraphQL/BFF.
- Optionally decide implementation by environment (local mock vs production API).

Because the UI consumes `HomePageData` props and not direct data sources, the components remain reusable and independent from backend details.
