# SnapNote - Screenshot & PDF Summarizer

Convert screenshots and PDFs into clean, summarized notes using Azure OpenAI.

## Features

- Upload images (PNG, JPG, JPEG) or PDF files
- Automatic text extraction (OCR for images, parsing for PDFs)
- AI-powered summarization using Azure OpenAI
- Generate downloadable Notes PDF with summary
- Clean React + Tailwind UI with drag-and-drop

## Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- Azure OpenAI API access

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file in backend directory:

```
AZURE_OPENAI_KEY=your_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=gpt-4
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

Run backend:

```bash
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access at: http://localhost:5173

## Usage

1. Drag and drop or click to upload a screenshot or PDF
2. View extracted text in the editor
3. Click "Summarize with AI" to generate summary
4. Download the Notes PDF with full text and summary
