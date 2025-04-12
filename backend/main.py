from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import google.generativeai as genai
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable not set")
genai.configure(api_key=GOOGLE_API_KEY)

# models = genai.ListModels()
# for model in models:
#     print(f"{model.name}: {model.supported_generation_methods}")

# Load dummy data
with open("../dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@app.get("/api/sales-reps")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    body = await request.json()
    user_question = body.get("question", "")
    
    if not user_question:
        return {"answer": "Please provide a question."}

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(user_question)
        return {"answer": response.text}
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return {"answer": "Sorry, there was an error processing your request."}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
