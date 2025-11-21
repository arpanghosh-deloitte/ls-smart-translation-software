from typing import Generator
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from sqlalchemy import create_engine
from contextlib import contextmanager

def get_engine():
    # connection_string = f"postgresql+asyncpg://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
    connection_string = settings.DATABASE_URL
    engine = create_engine(connection_string, pool_recycle=3600, pool_size=240, max_overflow=120)
    return engine

db_engine = get_engine()
db_session_maker = sessionmaker(bind=db_engine, autoflush=False, expire_on_commit=False)

@contextmanager
def acquire_db_session() -> Generator:
    session = db_session_maker()
    session.begin()
    try:
        yield session
        session.commit()
    except Exception as ex:
        session.rollback()
        raise ex
    finally:
        session.close()