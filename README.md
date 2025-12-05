# 📸 SnapNote - AI-Powered Document Summarizer

<div align="center">

![SnapNote Banner](https://img.shields.io/badge/SnapNote-AI%20Document%20Summarizer-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Azure](https://img.shields.io/badge/Azure-OpenAI-0078D4?style=for-the-badge&logo=microsoft-azure)

</div>

---

## 💡 The Problem

> **"I hate manually reading through long PDFs and screenshots to extract key information, so I built this."**

Reading lengthy documents, extracting text from images, and creating organized notes is time-consuming and tedious. SnapNote automates this entire workflow in seconds.

---

## 🎯 What It Does

SnapNote is a **lazy automation tool** that transforms screenshots and PDFs into clean, AI-summarized notes:

1. **📤 Upload** - Drop any screenshot (PNG/JPG) or PDF file
2. **🔍 Extract** - Automatically extract text using OCR technology
3. **🤖 Summarize** - Generate AI-powered summaries with key points
4. **📄 Download** - Get a beautifully formatted PDF report

**⏱️ Time Saved:** 15-25 minutes per document

---

## ✨ Features

### Core Functionality
- 📤 **Drag-and-Drop Upload** - Intuitive file upload interface
- 📝 **Direct Text Input** - Paste text directly for instant summarization
- 🔍 **Smart OCR** - Tesseract-powered text extraction from images
- 📑 **PDF Parsing** - Extract text from both regular and scanned PDFs
- 🤖 **AI Summarization** - Azure OpenAI GPT-4 generates structured summaries
- 📄 **PDF Generation** - Create professional notes with ReportLab
- ✏️ **Editable Text** - Review and modify extracted text before summarizing

### User Experience
- 🎨 **Modern UI** - Beautiful glassmorphism design
- 🌊 **Animated Background** - Floating gradient blobs and particles
- ⚡ **Fast Processing** - Results in 10-15 seconds
- 📱 **Responsive Design** - Works on all devices
- 🔔 **Real-time Feedback** - Loading states and notifications

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Custom Animations** - Smooth transitions and effects

### Backend
- **FastAPI** - High-performance Python framework
- **Azure OpenAI** - GPT-4 for summarization
- **Tesseract OCR** - Text extraction from images
- **pdfplumber** - PDF text parsing
- **ReportLab** - PDF generation
- **Python 3.11** - Latest Python features

### Libraries & Tools
```
Frontend: react, vite, tailwindcss, axios
Backend: fastapi, openai, pytesseract, pdfplumber, reportlab
OCR: tesseract-ocr
AI: Azure OpenAI (GPT-4)
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- ✅ Python 3.8 or higher
- ✅ Node.js 16 or higher
- ✅ Azure OpenAI API access
- ✅ Tesseract OCR installed

### 1️⃣ Install Tesseract OCR

**Windows:**
```bash
# Download installer from:
https://github.com/UB-Mannheim/tesseract/wiki

# Add to PATH:
C:\Program Files\Tesseract-OCR
```

**macOS:**
```bash
brew install tesseract
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**
```env
AZURE_OPENAI_KEY=your_azure_openai_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=gpt-4
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

**Start the backend server:**
```bash
uvicorn main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 4️⃣ Access the Application

- **Frontend UI:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

---

## 📖 Usage Guide

### Method 1: Upload Files

1. **Upload Your File**
   - Drag and drop a screenshot or PDF
   - Or click "Browse Files" to select
   - Supported formats: PNG, JPG, JPEG, PDF

2. **Review Extracted Text**
   - View the automatically extracted text
   - Edit if needed (text is editable)
   - Check word and character count

3. **Generate AI Summary**
   - Click "Summarize with AI" button
   - Wait 5-10 seconds for processing
   - View structured summary with:
     - Brief overview
     - Key bullet points
     - Important insights

4. **Download PDF Report**
   - Click "Download PDF" button
   - Get a formatted PDF containing:
     - Source file name
     - Generation timestamp
     - AI-generated summary
     - Full extracted text

### Method 2: Paste Text Directly

1. **Switch to Paste Mode**
   - Click "📝 Paste Text" button at the top

2. **Paste Your Content**
   - Paste any text from articles, emails, notes
   - See real-time word and character count
   - No file upload needed

3. **Generate AI Summary**
   - Click "Summarize with AI" button
   - Wait 5-10 seconds for processing
   - View formatted summary instantly

4. **Use Your Summary**
   - Copy the summary for your notes
   - Share insights with your team
   - Save time reading lengthy content

---

## 💼 Use Cases

### 👨‍🎓 Students
- **Lecture Notes:** Summarize professor's slides instantly
- **Study Guides:** Convert textbook pages to organized notes
- **Research Papers:** Quick review of academic papers
- **Exam Prep:** Extract key concepts from study materials
- **Article Summaries:** Paste web articles for quick summaries

### 💼 Professionals
- **Meeting Notes:** Capture and summarize whiteboard screenshots
- **Reports:** Extract key points from lengthy documents
- **Presentations:** Summarize slide decks quickly
- **Email Summaries:** Paste long emails for action items
- **Web Content:** Summarize articles and blog posts

### 🔬 Researchers
- **Paper Review:** Quickly assess research papers
- **Literature Review:** Summarize multiple papers efficiently
- **Data Extraction:** Pull key findings from documents
- **Citation Management:** Extract important quotes
- **Content Analysis:** Paste and analyze text content

---

## 📁 Project Structure

```
snapnote/
├── backend/                      # FastAPI Backend
│   ├── main.py                  # API endpoints & CORS
│   ├── text_extractor.py        # OCR & PDF parsing logic
│   ├── summarizer.py            # Azure OpenAI integration
│   ├── pdf_generator.py         # PDF creation with ReportLab
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example            # Environment template
│   └── start.bat               # Windows startup script
│
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedBackground.jsx  # Animated UI background
│   │   │   ├── FileUpload.jsx         # Drag-and-drop upload
│   │   │   ├── TextEditor.jsx         # Text display/editing
│   │   │   ├── SummaryDisplay.jsx     # AI summary formatting
│   │   │   └── FeatureCard.jsx        # Feature showcase
│   │   ├── App.jsx             # Main application logic
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Styles & animations
│   ├── index.html              # HTML template
│   ├── package.json            # Node dependencies
│   ├── vite.config.js          # Vite configuration
│   └── tailwind.config.js      # Tailwind configuration
│
├── .kiro/                        # Kiro AI Documentation
│   ├── README.md               # How Kiro was used
│   ├── architecture.md         # System architecture
│   ├── prompts.md              # Development prompts
│   └── conversation-log.md     # Development logs
│
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## 🔌 API Endpoints

### POST `/upload`
Upload and extract text from file

**Request:**
```javascript
FormData: { file: File }
```

**Response:**
```json
{
  "filename": "document.pdf",
  "text": "Extracted text content...",
  "success": true
}
```

### POST `/summarize`
Generate AI summary from text

**Request:**
```json
{
  "text": "Text to summarize..."
}
```

**Response:**
```json
{
  "summary": "AI-generated summary with sections...",
  "success": true
}
```

### POST `/generate-pdf`
Create downloadable PDF report

**Request:**
```json
{
  "filename": "document.pdf",
  "text": "Extracted text...",
  "summary": "AI summary..."
}
```

**Response:**
```
PDF file (application/pdf)
```

---

## 🎨 UI Features

### Design Elements
- **Glassmorphism** - Frosted glass effect with backdrop blur
- **Gradient Animations** - Smooth color transitions
- **Floating Blobs** - Animated background elements
- **Particle Effects** - Subtle floating particles
- **Shimmer Effects** - Text and icon animations
- **Responsive Layout** - Mobile-friendly design

### Animations
- `animate-blob` - Morphing gradient blobs
- `animate-float` - Floating particles
- `animate-sparkle` - Twinkling stars
- `animate-shimmer` - Text shimmer effect
- `animate-fadeIn` - Smooth fade-in transitions
- `animate-slideIn` - Slide-in animations

---

## ⚡ Performance

| Operation | Time |
|-----------|------|
| Text Extraction (Image) | 2-5 seconds |
| Text Extraction (PDF) | 1-3 seconds |
| AI Summarization | 5-10 seconds |
| PDF Generation | 1-2 seconds |
| **Total Processing** | **~10-15 seconds** |

---

## 🔒 Security

- ✅ API keys stored in `.env` (never committed)
- ✅ File type validation (PNG, JPG, PDF only)
- ✅ CORS configured for local development
- ✅ Temporary file storage with cleanup
- ✅ Input validation on all endpoints
- ✅ Environment variables for sensitive data

---

## 🐛 Troubleshooting

### Tesseract Not Found
```python
# Add to text_extractor.py
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

### Azure OpenAI Errors
- Verify API key in `.env`
- Check deployment name matches Azure resource
- Ensure API version is correct

### Port Already in Use
```bash
# Backend
uvicorn main:app --reload --port 8001

# Frontend - Update API_URL in App.jsx
```

---

## 🤝 Contributing

This project was built for the **Week 2: Lazy Automation Challenge**. Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - feel free to use and modify!

---

## 🙏 Acknowledgments

- **Azure OpenAI** - For providing GPT-4 API access
- **Tesseract OCR** - For open-source text extraction
- **FastAPI** - For the amazing Python framework
- **React Team** - For the powerful UI library
- **Kiro AI** - For accelerating development

---

## 📊 Project Stats

- **Development Time:** 2-3 hours with Kiro AI
- **Lines of Code:** ~1,500+
- **Components:** 6 React components + 4 Python modules
- **Time Saved vs Manual:** ~8-10 hours
- **Documents Processed:** Unlimited

---

<div align="center">

### 🏆 Week 2: Lazy Automation Challenge

**Built with ❤️ using Kiro AI Assistant**

[Report Bug](https://github.com/PAVAN2627/SnapNote-Screenshot_And_PDF_Summarizer/issues) · [Request Feature](https://github.com/PAVAN2627/SnapNote-Screenshot_And_PDF_Summarizer/issues)

</div>
