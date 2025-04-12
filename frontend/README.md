# Frontend: Sales Dashboard (Next.js)

This directory contains the frontend application for the Sales Dashboard, built using Next.js.

## Overview

The Next.js application provides a user interface to view and interact with data related to sales representatives, fetched from the FastAPI backend API. It displays sales representative details, including their deals, skills, and client information. It also includes an interface to interact with the optional AI endpoint.

## Features

* **Data Fetching:** Fetches data from the backend API asynchronously.
* **Data Display:** Renders sales representative data in a user-friendly format.
* **Nested Data Handling:** Demonstrates handling of nested JSON structures (e.g., deals and clients within sales representatives).
* **Loading and Error Handling:** Shows a loading state while fetching data and handles potential errors gracefully.
* **AI Interaction (Optional):**
    * Provides an input field for users to ask questions.
    * Displays responses from the backend AI endpoint.

## Technologies Used

* [Next.js](https://nextjs.org/): A React framework for building production-ready applications.
* [React](https://reactjs.org/): A JavaScript library for building user interfaces.
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Programming language.
* [npm](https://www.npmjs.com/): Package manager.
* [CSS Modules](https://github.com/css-modules/css-modules): For styling components (or you can specify your styling approach).

## Setup

1.  **Prerequisites:**
    * Node.js (LTS version recommended) installed.
    * npm (Node Package Manager) installed (comes with Node.js).

2.  **Install dependencies:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Access the application:**
    * Open your browser and go to `http://localhost:3000`.

## Page Structure

* `pages/index.js`: The main page that displays the sales representative data and the AI interaction interface.

## Styling

* The application uses CSS Modules for styling. CSS files are named `[ComponentName].module.css` (e.g., `Home.module.css`) and imported into the component.
* *(If you used a different styling approach, update this section accordingly).*

## Data Fetching

* The `useEffect` hook in `pages/index.js` fetches data from the backend API at `http://localhost:8000/api/sales-reps` using the `fetch` API.
* The fetched data is stored in the `salesReps` state variable.
* Error handling is implemented using the `error` state.
* A loading state is managed using the `loading` state.

## AI Interaction

* The user can type a question in the input field.
* Clicking the "Ask" button triggers the `handleAskQuestion` function, which sends a `POST` request to the backend's `/api/ai` endpoint.
* The AI's response is displayed in the `answer` section.

## Author

Mohammad Rizky Adhiguna