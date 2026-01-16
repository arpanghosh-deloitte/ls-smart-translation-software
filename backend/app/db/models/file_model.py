from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base_model import Base

class File(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    path = Column(String, nullable=False)
    status = Column(String, default="uploaded")
    translation_status = Column(String, default="not_translated")
    translated_path = Column(String, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    package_id = Column(Integer, ForeignKey("packages.id"), nullable=False)

    package = relationship("Package", back_populates="files")