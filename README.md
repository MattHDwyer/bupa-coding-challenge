# Bupa Coding Challenge

A [Next.js](https://nextjs.org) app built with React 19, Tailwind CSS 4, and Zod 4.

## Improvements I Would Make:

1. Adding toast notifications to the click of buttons
2. Additional tests for the components themselves
3. Add additional logging (e.g. Sentry/DataDog etc)

## Process:

1. Added neccessary dependencies I thought I'd require
2. Implemented server action first
3. Set up React Query to fetch the data
4. Design generic layout with HTML
5. Broke up the `page.tsx` into components
6. Added zod for schema checks on the response (after noticing some unusual responses)
7. Added styling
8. Asked AI to double check a11y compliance, and implemented it's recommendations
9. Wrote some API tests (recognised that there were some times it was returning some data)
10. Updated documentation

## Installation

```bash
bun install
```

## Scripts

| Script   | Command          | Description                          |
| -------- | ---------------- | ------------------------------------ |
| `dev`    | `npm run dev`    | Start the Next.js development server |
| `build`  | `npm run build`  | Create a production build            |
| `start`  | `npm run start`  | Start the production server          |
| `lint`   | `npm run lint`   | Run ESLint                           |
| `test`   | `npm run test`   | Run tests with Vitest (watch mode)   |
| `format` | `npm run format` | Format code with Prettier            |

## Testing

Tests are run with [Vitest](https://vitest.dev/).

```bash
npm test
```

### `fetchBookOwners` (`src/actions/bookOwners.test.ts`)

Tests for the server action that fetches and validates data from the Bupa book owners API:

| Test                                                                       | Description                                                                                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **throws an error if the API returns a non-200 status code**               | Asserts that a non-OK response (e.g. 404) throws an `Error` with the status code                                         |
| **parses valid response**                                                  | Asserts that a well-formed API response is parsed and returned correctly via the Zod schema                              |
| **throws error on successful response with invalid schema**                | Asserts that a 200 response with data that doesn't match the schema (missing required `type` field) throws a `$ZodError` |
| **passes without error on successful response with additional properties** | Asserts that extra/unknown properties on owners and books are allowed through (`looseObject` passthrough behaviour)      |
