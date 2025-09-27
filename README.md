# Fullstack Course Project

This is a fullstack web application built as part of a course project.  
It contains a React frontend and a Node.js/Express backend.  
The purpose of this project is to demonstrate a complete client–server application with clear structure, testing, and development setup.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Adding a React Component](#adding-a-react-component)
- [Adding a Backend Endpoint](#adding-a-backend-endpoint)
- [Scripts Overview](#scripts-overview)
- [Requirements](#requirements)
- [License](#license)

---

## Features

- React frontend with Vite
- Node.js + Express backend
- REST API endpoints
- Client tests with Vitest (server tests planned)
- Hot reloading during development

---

## Architecture

The project follows a simple **client–server architecture**:

- **Client (React + Vite)**: Handles the UI and communicates with the backend via API requests.
- **Server (Node.js + Express)**: Provides RESTful API endpoints and processes data.
- **Testing**:
    - Client tests use **Vitest**.
    - **Server tests are not configured yet.**

---

## Project Structure

```text
fullstack_course_project/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── types/
│       ├── apiClient.ts
│       ├── apischema.d.ts
│       └── main.tsx
├── server/
│   └── src/
│       ├── db/
│       ├── data.ts
│       ├── dataTypes.ts
│       ├── eventsRouter.ts
│       ├── middleware.ts
│       └── index.ts
└── doc/ • playground/ • package.json • README.md
```

<details>
<summary><strong>See full file tree</strong></summary>

```text
fullstack_course_project/
│
├── client/                     # React frontend
│   ├── public/                 # Static assets served by Vite
│   ├── src/
│   │   ├── assets/             # Images / static assets used by components
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page-level components (routing targets)
│   │   ├── types/              # Shared TypeScript types
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── apiClient.ts
│   │   ├── apischema.d.ts
│   │   ├── index.css
│   │   ├── main.tsx            # React/Vite entry point
│   │   └── vite-env.d.ts
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   └── vitest.setup.ts
│
├── server/                     # Node.js + Express backend
│   ├── src/
│   │   ├── db/                 # Database setup
│   │   ├── data.ts
│   │   ├── dataTypes.ts
│   │   ├── eventsRouter.ts     # Express router
│   │   ├── index.ts            # Server entry point
│   │   └── middleware.ts       # middleware
│   ├── eslint.config.mts
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
├── doc/                        # Documentation files
├── playground/                 # Experiments
├── .gitignore
├── README.md
├── createDocs.js               # Script for docs
├── package-lock.json
└── package.json                # Root config
```
</details>

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/sbozik/fullstack_course_project.git
cd fullstack_course_project
```

Install dependencies:
```bash
npm install
npm install --prefix client
npm install --prefix server
```

---

## Running the Application

**Frontend:**
```bash
npm run dev --prefix client
npm run build --prefix client
npm run preview --prefix client
```

**Backend:**
```bash
npm run dev --prefix server
npm run build --prefix server
npm start --prefix server
```

---

## Running Tests

```bash
npm test --prefix client   # frontend (Vitest)
```

```bash
# Server tests are not configured yet (script exits with error for now)
# npm test --prefix server
```

---

## Adding a React Component

1. Create the component file in `client/src/components/`.  
   Example: `client/src/components/MyButton.tsx`
2. Add tests in `client/src/`.  
   Example: `client/src/MyButton.spec.tsx`
3. Import and use the component in a page (e.g. `client/src/pages/Home.tsx`).

---

## Adding a Backend Endpoint

1. Define the route in `server/src/eventsRouter.ts` (or create a new router file, e.g., `server/src/usersRouter.ts`).
2. Mount the router in `server/src/index.ts`.
3. Put/read data in `server/src/db/`.
4. Define shared shapes in `server/src/dataTypes.ts` (and mirror in `client/src/types` if the client consumes them).
5. Restart the backend after changes.

---

## Scripts Overview

**Client:**
```bash
npm run dev --prefix client      # Vite dev server
npm run build --prefix client    # type-check (tsc -b) + build
npm run preview --prefix client  # preview the production build
npm run lint --prefix client     # run ESLint
npm test --prefix client         # Vitest
```

**Server:**
```bash
npm run dev --prefix server      # start backend in dev mode (nodemon src/index.ts)
npm run build --prefix server    # compile TypeScript to dist/
npm start --prefix server        # run compiled server (node dist/index.js)
```

---

## Requirements

- Node.js >= 18
- npm >= 9

---

## License

This project is for educational purposes as part of a fullstack course.  
Free to use as a reference.
