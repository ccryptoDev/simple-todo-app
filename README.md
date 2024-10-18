# Simple Todo App with Node.js, Next.js, and GraphQL

## Overview

This is a simple **Todo List Application** built using **Node.js**, **Next.js**, **GraphQL**, and **SQLite**. The app allows users to create, view, update, and delete tasks, while also supporting the generation of a CSV file with the tasks.

## Technologies

- **Frontend**: React (Next.js), Tailwind CSS, TypeScript, Axios
- **Backend**: Node.js, Express, GraphQL, Sequelize (ORM), SQLite
- **Database**: SQLite
- **Styling**: Tailwind CSS
- **GraphQL Client**: Apollo Client

## Installation

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ccryptoDev/simple-todo-app.git
   cd todo-app
   ```

2. **Install dependencies for both frontend and backend:**

  Install the dependencies for both the frontend and backend. The frontend dependencies are installed by running:

  ```bash
  npm install
  cd backend
  npm install
  ```

3. **Create the SQLite database:**

When you start the backend for the first time, the SQLite database (tasks.db) will be automatically generated in the backend/ folder.

4. **Configure environment variables:**

Just use the environment files which exists currently. If needed, you may change API_URL & PORT as you want.

5. **Start the development server:**

- Running both the frontend and backend concurrently from the root directory:

  ```bash
  npm run dev
  ```
  
- Or alternatively, running frontend and backend separatelly

  **To start the frontend (from the root directory):**

  ```bash
  npm run frontend
  ```

  **To start the backend (from the backend directory):**

  ```bash
  npm run dev
  ```

6. **Open the app in your browser:**

**frontend:**

  ```bash
  http://localhost:3000
  ```

**backend:**

  ```bash
  http://localhost:5000/graphql
  ```