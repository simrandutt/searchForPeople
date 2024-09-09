# Search For People

This is a full-stack project that allows users to view and search for people using data from the Star Wars API (SWAPI).

## Project Structure

- **Backend**: A REST API built with Node.js, Express, and TypeScript. The backend wraps the SWAPI and provides two main endpoints:
  - `GET /api/people`: Fetch a list of people.
  - `GET /api/people/search`: Search for people by name.
  
- **Frontend**: A React (Remix) application with Tailwind CSS for styling. The frontend displays a list of people and allows users to search for a person.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### 1. Backend Setup

1. **Navigate to the `backend` folder**:

    ```bash
    cd backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the backend server**:

    ```bash
    npm run dev
    ```

    This will start the backend API on `http://localhost:3000`.

4. **Running Tests**:

    To run unit tests for the backend:

    ```bash
    npm test
    ```

### 2. Frontend Setup

1. **Navigate to the `frontend` folder**:

    ```bash
    cd frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the frontend development server**:

    ```bash
    npm run dev
    ```

    This will start the frontend application on `http://localhost:5173`.

4. **Running Tests**:

    To run unit tests for the frontend:

    ```bash
    npm test
    ```

### 3. Access the Application

Once both servers are running:
- The **backend** API will be available at `http://localhost:3000`.
- The **frontend** application will be available at `http://localhost:5173`.

### 4. Key Features

- **View a List of People**: The app fetches a list of Star Wars characters from the SWAPI.
- **Search Functionality**: Users can search for people by name. The search is debounced to prevent multiple API requests during typing.

### 5. Notes

- If any port conflicts occur, update the `package.json` scripts or the respective environment configurations.\

- Ensure both the frontend and backend are running simultaneously for the application to function correctly.
<img width="916" alt="Screenshot 2024-09-09 at 1 56 15 PM" src="https://github.com/user-attachments/assets/5c2491a2-64f9-4aa7-9dab-996d6c1c91df">

<img width="768" alt="Screenshot 2024-09-09 at 1 56 56 PM" src="https://github.com/user-attachments/assets/a2b1815c-11e5-4240-8da9-d7b71b2ac145">

<img width="800" alt="Screenshot 2024-09-09 at 1 57 28 PM" src="https://github.com/user-attachments/assets/21dfb5f3-f9f5-46bb-807e-dc010a1f069d">




- 
