# SnapNote Architecture

## System Overview

```
┌─────────────┐         ┌──────────────┐         ┌─────────────────┐
│   Browser   │ ◄─────► │   FastAPI    │ ◄─────► │  Azure OpenAI   │
│  (React UI) │         │   Backend    │         │   (GPT-4)       │
└─────────────┘         └──────────────┘         └─────────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │  Tesseract   │
                        │     OCR      │
                        └──────────────┘
```

## Component Architecture

### Frontend (React + Vite)
```
src/
├── App.jsx                    # Main application logic
├── components/
│   ├── AnimatedBackground.jsx # Animated gradient background
│   ├── FileUpload.jsx        # Drag-and-drop upload
│   ├── TextEditor.jsx        # Extracted text display
│   ├── SummaryDisplay.jsx    # AI summary formatting
│   └── FeatureCard.jsx       # Feature showcase
└── index.css                 # Animations & styles
```

### Backend (FastAPI)
```
backend/
├── main.py              # API endpoints & CORS
├── text_extractor.py    # OCR & PDF parsing
├── summarizer.py        # Azure OpenAI integration
└── pdf_generator.py     # ReportLab PDF creation
```

## Data Flow

### 1. File Upload Flow
```
User uploads file
    ↓
Frontend sends to /upload
    ↓
Backend saves file temporarily
    ↓
Detect file type (image/PDF)
    ↓
Extract text (OCR or PDF parser)
    ↓
Return extracted text to frontend
```

### 2. Summarization Flow
```
User clicks "Summarize"
    ↓
Frontend sends text to /summarize
    ↓
Backend calls Azure OpenAI API
    ↓
GPT-4 generates structured summary
    ↓
Return formatted summary
    ↓
Frontend displays with formatting
```

### 3. PDF Generation Flow
```
User clicks "Download PDF"
    ↓
Frontend sends text + summary to /generate-pdf
    ↓
Backend uses ReportLab to create PDF
    ↓
Format with title, sections, styling
    ↓
Return PDF as blob
    ↓
Browser downloads file
```

## API Endpoints

### POST /upload
- **Input:** File (multipart/form-data)
- **Process:** Extract text using OCR or PDF parser
- **Output:** `{ filename, text, success }`

### POST /summarize
- **Input:** `{ text: string }`
- **Process:** Call Azure OpenAI for summarization
- **Output:** `{ summary, success }`

### POST /generate-pdf
- **Input:** `{ filename, text, summary }`
- **Process:** Generate PDF with ReportLab
- **Output:** PDF file (blob)

## Technology Decisions

### Why FastAPI?
- Fast async support
- Automatic API documentation
- Easy file handling
- Python ecosystem for AI/ML

### Why React + Vite?
- Fast development with HMR
- Modern build tooling
- Component-based architecture
- Great developer experience

### Why Azure OpenAI?
- Enterprise-grade reliability
- GPT-4 access
- Structured API
- Good documentation

### Why Tesseract?
- Free and open-source
- Accurate OCR
- Multi-language support
- Active community

## Security

- API keys stored in `.env` (not committed)
- File type validation (PNG, JPG, PDF only)
- CORS configured for local development
- Temporary file storage with cleanup
- Input validation on all endpoints

## Performance

- Async operations in FastAPI
- Lazy loading of components
- Browser caching of static assets
- SVG icons for scalability
- Minimal dependencies

## Scalability Considerations

**Current:** Single-user local application

**Future Options:**
- Redis for caching
- S3 for file storage
- Job queue (Celery)
- Rate limiting
- Cloud deployment (AWS/Azure)
- User authentication
- Database for history
