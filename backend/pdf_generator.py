import os
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def generate_notes_pdf(filename: str, extracted_text: str, summary: str) -> str:
    """Generate a clean Notes PDF with extracted text and summary"""
    
    output_path = os.path.join("outputs", f"SnapNote_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf")
    
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                           rightMargin=72, leftMargin=72,
                           topMargin=72, bottomMargin=18)
    
    story = []
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor='#2563eb',
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=16,
        textColor='#1e40af',
        spaceAfter=12,
        spaceBefore=12
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['BodyText'],
        fontSize=11,
        leading=14,
        alignment=TA_LEFT
    )
    
    story.append(Paragraph("SnapNote Summary Report", title_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph(f"<b>Source File:</b> {filename}", body_style))
    story.append(Paragraph(f"<b>Generated:</b> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}", body_style))
    story.append(Spacer(1, 0.3*inch))
    
    story.append(Paragraph("AI-Generated Summary", heading_style))
    story.append(Spacer(1, 0.1*inch))
    
    summary_paragraphs = summary.split('\n')
    for para in summary_paragraphs:
        if para.strip():
            story.append(Paragraph(para, body_style))
            story.append(Spacer(1, 0.1*inch))
    
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("Extracted Text", heading_style))
    story.append(Spacer(1, 0.1*inch))
    
    text_paragraphs = extracted_text.split('\n')
    for para in text_paragraphs:
        if para.strip():
            story.append(Paragraph(para, body_style))
            story.append(Spacer(1, 0.05*inch))
    
    doc.build(story)
    
    return output_path
