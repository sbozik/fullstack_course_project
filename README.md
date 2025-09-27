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
- Unit and integration tests for client and server
- Hot reloading during development

---

## Architecture

The project follows a simple **client–server architecture**:

- **Client (React + Vite)**: Handles the UI and communicates with the backend via API requests.
- **Server (Node.js + Express)**: Provides RESTful API endpoints and processes data.
- **Testing**:
    - Client tests use **Vitest**.
    - Server tests use **Jest**.

---

## Project Structure

fullstack_course_project/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Page components
│ │ ├── api/ # API client for backend calls
│ │ ├── tests/ # Frontend tests
│ │ └── main.tsx # App entry point
│ └── vite.config.ts
│
├── server/ # Node.js backend
│ ├── src/
│ │ ├── routes/ # Route definitions
│ │ ├── controllers/ # Request handling logic
│ │ ├── services/ # Business logic / helpers
│ │ ├── tests/ # Backend tests
│ │ └── index.ts # Server entry point
│ └── package.json
│
└── package.json # Root config


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

```bash
npm run dev --prefix client # start the frontend
```
```bash
npm run dev --prefix server # start the backend
```

---

## Running Tests

```bash
npm test --prefix client # frontend
```
```bash
npm test --prefix server # backend
```

---

## Adding a React Component

1. Create the component file in client/src/components/.
   Example: client/src/components/MyButton.tsx
2. Add tests in client/src/tests/.
   Example: client/src/tests/MyButton.test.tsx
3. Import and use the component in a page (e.g. client/src/pages/Home.tsx)

---

## Adding a Backend Endpoint

1. Add a route in server/src/routes/.
   Example: userRoutes.ts
2. Add a controller in server/src/controllers/.
3. Add business logic in server/src/services/.
4. Write tests in server/src/tests/.

---

## Scripts Overview

Client:
```bash
npm run dev --prefix client → start frontend in dev mode
npm run build --prefix client → build frontend for production
npm test --prefix client → run frontend tests
```

Server:
```bash
npm run dev --prefix server → start backend in dev mode
npm run start --prefix server → start backend in production
npm test --prefix server → run backend tests
```

---

## Requirements

Node.js >= 18
npm >= 9

---

## License

This project is for educational purposes as part of a fullstack course.
You are free to use it as a reference.
