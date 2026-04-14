# Aidifys Hiring Frontend (No Backend)

This project now runs as a complete frontend-only app.

All backend API calls are handled by an in-browser mock backend:
- No Node/Express backend is required.
- Data is persisted in `localStorage`.
- Existing pages (jobs, auth, blogs, apply, saved jobs, profile) continue to work.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm start
```

3. Build production bundle:

```bash
npm run build
```

## Demo Accounts

You can log in with seeded users:

- Admin
	- Email: `usama.mang0901@gmail.com`
	- Password: `admin123`
- Demo User
	- Email: `demo@aidifys.com`
	- Password: `demo123`

## Frontend Mock Behavior

- Auth, jobs, blogs, likes, applications, and user profile are served from the mock backend in `src/utils/mockBackend.js`.
- Created jobs/blogs and user actions are stored in browser storage under:
	- `__aidifys_mock_db_v1`

## Reset Mock Data

To reset the app to initial seeded data:

1. Open browser DevTools.
2. Go to Application/Storage -> Local Storage.
3. Delete key `__aidifys_mock_db_v1`.
4. Refresh the page.

