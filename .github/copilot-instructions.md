<!-- # Copilot Instructions for OpsMastery.v5-Client

## Project Overview
This is a Next.js 15 (App Router) admin dashboard template using TypeScript, shadcn/ui, Tailwind CSS, TanStack Table, Zustand, and Clerk for authentication. The codebase is modular, feature-based, and uses REST APIs and WebSockets for data and chat features.

## Key Conventions
- **API Calls:**
  - Centralized in `src/lib/api/api.ts` using an Axios instance from `src/lib/api/axios.ts`.
  - JWT and refresh token logic handled via Axios interceptors.
  - All new API calls should be added to `api.ts` and use the shared Axios instance.
- **Authentication:**
  - Use the custom hook `src/hooks/useAuth.ts` for authentication state and actions.
  - Tokens are managed via localStorage and Axios interceptors.
- **Data Fetching:**
  - Use custom hooks (e.g., `useUsers.ts`, `useUserById.ts`) for fetching and managing data.
  - Table search/filter is backend-powered; search state is lifted to parent and passed to toolbar.
- **UI Components:**
  - Use shadcn/ui components for all new UI work.
  - Tables use TanStack Table; columns and data keys must match API response.
  - Chat UI is modular: sidebar, header, messages, input. State is managed in parent container.
- **Feature Organization:**
  - Features are organized under `src/features/{feature}/components/`.
  - Pages are under `src/app/{feature}/`.
  - Shared UI components are in `src/components/` and `src/components/ui/`.
- **Styling:**
  - Use Tailwind CSS utility classes. Global styles in `src/app/globals.css`.
- **Forms:**
  - Use React Hook Form + Zod for validation.
- **State Management:**
  - Use Zustand for global state when needed.
- **Error Handling:**
  - Use Sentry integration for error tracking. Centralized error page in `src/app/global-error.tsx`.

## How to Add Features
1. **Create a new feature folder:** `src/features/{feature}/components/`
2. **Add page(s):** `src/app/{feature}/`
3. **Add API calls:** In `src/lib/api/api.ts`, using the shared Axios instance.
4. **Create hooks:** For data fetching/state, add to `src/hooks/`.
5. **Use shadcn/ui components:** For UI, import from `src/components/ui/`.
6. **Follow table/chat conventions:**
   - Table: Backend search/filter, columns match API keys.
   - Chat: State lifted to parent, modular components.

## Testing & Validation
- Use dummy data for UI prototyping, then connect to API.
- Validate table and chat features with real API responses.
- Run linting and formatting before committing (ESLint, Prettier, Husky).

## References
- API: `src/lib/api/api.ts`, `src/lib/api/axios.ts`
- Auth: `src/hooks/useAuth.ts`
- Table: `src/features/users/components/user-listing.tsx`, `user-tables/columns.tsx`, `user-tables/index.tsx`
- Chat: `src/features/chat/components/ChatSidebar.tsx`, `ChatHeader.tsx`, `ChatMessages.tsx`, `ChatInput.tsx`, `ChatContainer.tsx`
- Layout: `src/components/layout/`
- UI: `src/components/ui/`

## Best Practices
- Keep API logic out of UI components; use hooks and centralized API files.
- Use feature-based organization for scalability.
- Prefer composition and modularity in UI.
- Document new patterns in this file for future agents.

---
*Update this file as conventions evolve. Ask the user for feedback if anything is unclear or missing.* -->
