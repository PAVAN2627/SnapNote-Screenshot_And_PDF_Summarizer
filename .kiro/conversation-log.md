# SnapNote - Kiro Conversation Log

## Project Development with Kiro AI

This document shows the key prompts and interactions used to build SnapNote with Kiro.

---

## Initial Request

**User Prompt:**
```
I want to build a tool that allows users to upload either a screenshot (JPG/PNG) or a PDF file. 
The tool should automatically extract all text from the uploaded file, summarize it using Azure OpenAI, 
and allow the user to download a clean Notes PDF containing the extracted text and the AI-generated summary.

Complete functionality:
1. File Upload (PNG, JPG, JPEG, PDF)
2. Text Extraction (OCR for images, PDF parser for documents)
3. AI Summarization using Azure OpenAI (GPT-4)
4. Notes PDF Generation
5. Clean React + Tailwind UI with drag-and-drop
6. FastAPI backend
```

**Kiro Response:**
- Created complete project structure
- Backend: FastAPI with text extraction, summarization, PDF generation
- Frontend: React + Vite + Tailwind with drag-and-drop UI
- Integrated Azure OpenAI for summarization
- Implemented OCR using Tesseract

---

## Issue Resolution

### Issue 1: Numpy Compatibility Error
**Error:** `ValueError: numpy.dtype size changed, may indicate binary incompatibility`

**Solution:**
- Downgraded numpy to 1.24.3
- Pinned pandas to 2.0.3
- Fixed pytesseract dependencies

### Issue 2: Azure OpenAI Client Error
**Error:** `Client.__init__() got an unexpected keyword argument 'proxies'`

**Solution:**
- Upgraded OpenAI library to 1.54.0
- Downgraded httpx to 0.27.2
- Fixed httpcore to 1.0.6

---

## UI Enhancement Request

**User Prompt:**
```
Now working need Good UI and animation because brief summary looking like plain text
```

**Kiro Response:**
- Enhanced summary display with formatted sections
- Added numbered badges for sections
- Styled bullet points
- Added gradient backgrounds
- Implemented smooth animations

---

## Animated Background Request

**User Prompt:**
```
Can you make that background with Good UI animation that moving and all
```

**Kiro Response:**
- Created AnimatedBackground component
- Added floating gradient blobs
- Implemented particle animations
- Added geometric shapes with rotation
- Created sparkle effects
- Applied glassmorphism to all cards
- Added shimmer effects to header

**Animations Implemented:**
- `animate-blob` - Morphing gradient blobs
- `animate-float` - Floating particles
- `animate-sparkle` - Twinkling stars
- `animate-shimmer` - Text shimmer effect
- `animate-fadeIn` - Smooth fade-in
- `animate-slideIn` - Slide animations

---

## Final Cleanup

**User Prompt:**
```
Remove testing files and unnecessary md files, need clean project
```

**Kiro Response:**
- Removed test_azure.py
- Removed test_summarize.py
- Removed SETUP.md
- Cleaned up .kiro directory
- Kept only essential files

---

## Key Features Developed

1. **File Upload System**
   - Drag-and-drop interface
   - File type validation
   - Visual feedback

2. **Text Extraction**
   - Tesseract OCR for images
   - pdfplumber for PDFs
   - Fallback to OCR for scanned PDFs

3. **AI Summarization**
   - Azure OpenAI integration
   - Structured output (summary, bullets, insights)
   - Error handling

4. **PDF Generation**
   - ReportLab implementation
   - Formatted sections
   - Timestamp and metadata

5. **Animated UI**
   - Gradient background
   - Glassmorphism design
   - Smooth transitions
   - Loading states

---

## Technologies Used

- **Frontend:** React 18, Vite, Tailwind CSS, Axios
- **Backend:** FastAPI, Python 3.11
- **AI:** Azure OpenAI (GPT-4)
- **OCR:** Tesseract, pytesseract
- **PDF:** pdfplumber, PyPDF2, ReportLab
- **Styling:** Custom CSS animations, glassmorphism

---

## Development Time

Approximate time with Kiro assistance: 2-3 hours
- Initial setup: 30 minutes
- Core functionality: 1 hour
- Bug fixes: 30 minutes
- UI enhancements: 1 hour

**Time saved compared to manual development:** ~8-10 hours

---

## Lessons Learned

1. Dependency management is crucial (numpy/pandas compatibility)
2. Azure OpenAI requires specific library versions
3. Glassmorphism creates modern, professional UIs
4. Animations significantly improve user experience
5. Kiro accelerates development by handling boilerplate
