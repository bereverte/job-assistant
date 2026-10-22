from io import BytesIO

from pypdf import PdfReader
from pypdf.errors import PdfReadError


class PdfExtractionError(Exception):
    """Raised when a PDF cannot be read or contains no extractable text."""


def extract_text_from_pdf(content: bytes) -> str:
    """Return the text of a PDF. Raise PdfExtractionError if there is none."""
    try:
        reader = PdfReader(BytesIO(content))
        pages_text = [page.extract_text() or "" for page in reader.pages]
    except PdfReadError as error:
        raise PdfExtractionError("The file is not a valid PDF") from error

    text = "\n".join(pages_text).strip()
    if not text:
        raise PdfExtractionError("The PDF has no extractable text. Is it a scanned image?")
    return text