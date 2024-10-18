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

3. **Create the SQLite database**:

   When you start the backend for the first time, the SQLite database (`tasks.db`) will be automatically generated in the `backend/` folder. No additional setup is required for the database—just ensure that the backend is running, and it will create the database file for you.


4. **Configure environment variables**:

   Use the existing environment files that are included in the project. If necessary, you can modify the following variables:

   - **`API_URL`**: Set backend URL (`.env` in the root).
   - **`PORT`**: Change the port number on which the backend server will run (`/backend/.env`).

   Ensure that any changes made to these variables are saved in the appropriate environment file.


5. **Start the development server**:

   You have two options to run the application:

   - **To run both the frontend and backend concurrently from the root directory**, execute:
   
     ```bash
     npm run dev
     ```

   - **Alternatively, run the frontend and backend separately**:

     - **To start the frontend** (from the root directory):
       ```bash
       npm run frontend
       ```

     - **To start the backend** (from the backend directory):
       ```bash
       npm run dev
       ```

   Make sure to wait for both servers to start before accessing the application.

6. **Open the app in your browser**:

   Once both the frontend and backend servers are running, you can access the application using the following URLs:

   - **Frontend**:  
     Open your browser and go to:  
     [http://localhost:3000](http://localhost:3000)

   - **Backend**:  
     For the GraphQL API, navigate to:  
     [http://localhost:5000/graphql](http://localhost:5000/graphql)

   Ensure that the both are running to access these links successfully.
