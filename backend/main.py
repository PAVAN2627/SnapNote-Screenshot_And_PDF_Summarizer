from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
from dotenv import load_dotenv
from text_extractor import extract_text_from_file
from summarizer import summarize_text
from pdf_generator import generate_notes_pdf

load_dotenv()

app = FastAPI(title="SnapNote API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "SnapNote API is running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Extract text from uploaded image or PDF"""
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        extracted_text = extract_text_from_file(file_path)
        
        return {
            "filename": file.filename,
            "text": extracted_text,
            "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize")
async def summarize(data: dict):
    """Summarize text using Azure OpenAI"""
    try:
        text = data.get("text", "")
        if not text:
            raise HTTPException(status_code=400, detail="No text provided")
        
        summary = await summarize_text(text)
        
        return {
            "summary": summary,
            "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-pdf")
async def generate_pdf(data: dict):
    """Generate Notes PDF with extracted text and summary"""
    try:
        filename = data.get("filename", "document")
        text = data.get("text", "")
        summary = data.get("summary", "")
        
        pdf_path = generate_notes_pdf(filename, text, summary)
        
        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename="SnapNote_Summary.pdf"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
