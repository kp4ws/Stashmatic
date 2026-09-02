from datetime import datetime
from sqlalchemy import create_engine, DateTime, func
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column
from api.core.config import settings

'''
Engine manages the connection to the database and handles query execution.
'''
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

class TimestampMixin:
    '''
    Inherit from this to get auditing fields automatically
    '''
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()