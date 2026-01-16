from sqlalchemy.orm import Session
from app.db.base import Base
from app.db.session import db_engine, acquire_db_session
from logging import getLogger

logger = getLogger(__name__)

def init_modls(session: Session) -> str:
    Base.metadata.create_all(bind=db_engine)
    return "Success"

def db_init() -> None:
    print("----------------STARTED MODELS INITIALIZATION---------------")
    with acquire_db_session() as session:
        logger.info("--------------INITIALIZING PUBLIC SCHEMA AND MODELS----------------")
        init_modls(session)
        logger.info("--------------INITIALIZED DATA BASE----------------")
        logger.info("--------------INITIALIZED COMPLETED----------------")