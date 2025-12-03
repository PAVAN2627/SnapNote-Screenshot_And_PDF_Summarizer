import os
from PIL import Image
import pdfplumber
from PyPDF2 import PdfReader

try:
    import pytesseract
    TESSERACT_AVAILABLE = True
    
    # Try to set Tesseract path for Windows
    if os.name == 'nt':  # Windows
        possible_paths = [
            r'C:\Program Files\Tesseract-OCR\tesseract.exe',
            r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
        ]
        for path in possible_paths:
            if os.path.exists(path):
                pytesseract.pytesseract.tesseract_cmd = path
                break
except ImportError:
    TESSERACT_AVAILABLE = False
    print("Warning: pytesseract not available. OCR functionality will be limited.")

try:
    from pdf2image import convert_from_path
    PDF2IMAGE_AVAILABLE = True
except ImportError:
    PDF2IMAGE_AVAILABLE = False
    print("Warning: pdf2image not available. Scanned PDF OCR will be limited.")

def extract_text_from_image(image_path: str) -> str:
    """Extract text from image using Tesseract OCR"""
    if not TESSERACT_AVAILABLE:
        raise Exception("Tesseract OCR is not available. Please install pytesseract and Tesseract.")
    
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        raise Exception(f"Error extracting text from image: {str(e)}")

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF, fallback to OCR if needed"""
    text = ""
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        
        if text.strip():
            return text.strip()
        
        if not PDF2IMAGE_AVAILABLE or not TESSERACT_AVAILABLE:
            raise Exception("PDF appears to be scanned but OCR dependencies are not available.")
        
        print("PDF appears to be scanned, using OCR...")
        images = convert_from_path(pdf_path)
        for i, image in enumerate(images):
            page_text = pytesseract.image_to_string(image)
            text += f"\n--- Page {i+1} ---\n{page_text}"
        
        return text.strip()
    
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")

def extract_text_from_file(file_path: str) -> str:
    """Auto-detect file type and extract text"""
    ext = os.path.splitext(file_path)[1].lower()
    
    if ext in ['.png', '.jpg', '.jpeg']:
        return extract_text_from_image(file_path)
    elif ext == '.pdf':
        return extract_text_from_pdf(file_path)
    else:
        raise Exception(f"Unsupported file type: {ext}")
