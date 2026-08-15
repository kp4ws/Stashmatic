import pytest
import uuid

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from api.core.database import Base
from api.core.config import settings
from api.main import app
from api.core.database import get_db
from api.core.deps import get_current_user
from api.users.models import User

import api.models

TEST_DATABASE_URL = settings.TEST_DATABASE_URL

test_engine = create_engine(TEST_DATABASE_URL)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    """Creates all tables before the test session, drops them after"""
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)

@pytest.fixture()
def db_session():
    """Provides a transactional session for each test, rolled back after"""
    connection = test_engine.connect()
    transaction = connection.begin()
    session = TestSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture()
def test_user(db_session):
    """Creates a test user directly in the test db."""
    user = User(clerk_id="test_clerk_id_123", is_active=True)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

@pytest.fixture()
def client(db_session):
    """FastAPI TestClient with the test DB session injected"""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    def override_get_current_user():
        return test_user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    with TestClient(app) as c:
        yield c
        
    app.dependency_overrides.clear()