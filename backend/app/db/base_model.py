import re
from typing import Any

from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    @declared_attr.directive
    def __tablename__(cls: Any) -> str:
        return re.sub(r"(?<!^)(?=[A-Z])", "_", cls.__name__).lower()