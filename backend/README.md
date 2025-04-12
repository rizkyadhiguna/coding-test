# Backend: Sales Dashboard API (FastAPI)

This directory contains the backend API for the Sales Dashboard application, built using FastAPI.

## Overview

The FastAPI application serves data related to sales representatives, including their details, deals, and client information, from a `dummyData.json` file. It also includes an optional AI endpoint that currently integrates with the Google Gemini API to provide responses to user questions.

## Features

* **REST API:** Provides endpoints to access sales representative data.
* **Data Serving:** Reads and serves data from `dummyData.json`.
* **CORS Support:** Implements Cross-Origin Resource Sharing to allow requests from the Next.js frontend.
* **AI Integration (Optional):**
    * An endpoint (`/api/ai`) for interacting with the Google Gemini API.
    * Handles user questions and returns AI-generated responses.
* **API Documentation:** Automatic API documentation is available via Swagger UI at `/docs` (e.g., `http://localhost:8000/docs`).

## Technologies Used

* [FastAPI](https://fastapi.tiangolo.com/): A modern, fast (high-performance), web framework for building APIs with Python 3.7+
* [uvicorn](https://www.uvicorn.org/): A lightning-fast ASGI server.
* [Python](https://www.python.org/): Programming language.
* [json](https://docs.python.org/3/library/json.html): For handling JSON data.
* [CORS Middleware](https://fastapi.tiangolo.com/middleware/#cors): For handling Cross-Origin Resource Sharing.
* [google-generativeai](https://ai.google.dev/): Python library for interacting with the Google Gemini API (Optional).

## Setup

1.  **Prerequisites:**
    * Python 3.7+ installed.
    * pip (Python package installer) installed.

2.  **Create a virtual environment (recommended):**
    ```bash
    cd backend
    python3 -m venv coding-test
    source coding-test/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up Google Gemini API Key (Optional):**
    * If you want to use the AI feature, you need a Google Gemini API key.
    * Obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/).
    * Set the API key as an environment variable:
        ```bash
        export GOOGLE_API_KEY="YOUR_API_KEY"
        ```
        Replace `YOUR_API_KEY` with your actual API key.
        * **Important:** Do NOT hardcode your API key in the code.

5.  **Run the FastAPI server:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```

6.  **Access API Documentation:**
    * Open your browser and go to `http://localhost:8000/docs` to view the Swagger UI documentation.

## API Endpoints

* `GET /api/sales-reps`: Returns a list of sales representatives and their details.
* `POST /api/ai`: Accepts a user question and returns a response from the Google Gemini API (if configured) or a placeholder response.

## Data Structure (`dummyData.json`)

The `dummyData.json` file contains a JSON object with a key `salesReps`, which is an array of sales representative objects. Each sales representative object has the following structure:

```json
{
  "id": 1,
  "name": "Alice",
  "role": "Senior Sales Executive",
  "region": "North America",
  "skills": ["Negotiation", "CRM", "Client Relations"],
  "deals": [
    { "client": "Acme Corp", "value": 120000, "status": "Closed Won" }
  ],
  "clients": [
    { "name": "Acme Corp", "industry": "Manufacturing", "contact": "alice@acmecorp.com" }
  ]
}
```

## Author

Mohammad Rizky Adhiguna