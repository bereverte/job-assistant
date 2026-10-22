from io import BytesIO
from pathlib import Path

import pytest
from pypdf import PdfWriter

from app.services.pdf import PdfExtractionError, extract_text_from_pdf

FIXTURES = Path(__file__).parent / "fixtures"

def test_extract_text_returns_text_from_valid_pdf():
    content = (FIXTURES / "sample_resume.pdf").read_bytes()
    text = extract_text_from_pdf(content)

    assert "React" in text

def test_extract_text_raises_when_pdf_has_no_text():
    writer = PdfWriter()
    writer.add_blank_page(width=200, height=200)
    buffer = BytesIO()
    writer.write(buffer)
    content = buffer.getvalue()

    with pytest.raises(PdfExtractionError, match="no extractable text"):
        extract_text_from_pdf(content)

    
def test_extract_text_raises_when_file_is_not_a_pdf():
    content = b"this is not a pdf"
    
    with pytest.raises(PdfExtractionError, match="not a valid PDF"):
        extract_text_from_pdf(content)