from fastapi import APIRouter
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy import or_
from api.categories.models import Category
from api.categories.schemas import CategoryResponse, CategoryCreate, CategoryUpdate
from api.core.exceptions import raise_404
from api.core.dependencies import DBSession, CurrentUser
import uuid

#TODO: Possibly refactor this into init file
router = APIRouter()

# CREATE CATEGORY
@router.post("", status_code=201, response_model=CategoryResponse)
async def create_category(category: CategoryCreate, db: DBSession, current_user: CurrentUser):
    db_category = Category(**category.model_dump())
    db_category.user_id = current_user.id
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

#GET ALL CATEGORIES
@router.get("", response_model=list[CategoryResponse])
async def get_all_categories(db: DBSession, current_user: CurrentUser):
    return db.execute(
        select(Category).where(
            or_(
                Category.user_id == current_user.id,
                Category.is_default == True,
            ),
            Category.deleted_at.is_(None)
        )).scalars().all()

#GET SINGLE CATEGORY
@router.get("/{id}", response_model=CategoryResponse)
async def get_category(id: uuid.UUID, db: DBSession, current_user: CurrentUser):
    db_category = db.execute(
        select(Category).where(
            Category.id == id,
            or_(
                Category.user_id == current_user.id,
                Category.is_default == True,
            ),
            Category.deleted_at.is_(None)
        )
    ).scalar_one_or_none()

    if not db_category:
        raise_404("Category not found")

    return db_category

#UPDATE CATEGORY
@router.patch("/{id}", response_model=CategoryResponse)
async def update_category(id: uuid.UUID, category: CategoryUpdate, db: DBSession, current_user: CurrentUser):
    db_category = db.execute(
        select(Category).where(
            Category.id == id,
            Category.user_id == current_user.id,
            Category.deleted_at.is_(None)
        )
    ).scalar_one_or_none()

    if not db_category:
        raise_404("Category not found")

    update_data = category.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_category, field, value)

    db.commit()
    db.refresh(db_category)
    return db_category

#DELETE CATEGORY
@router.delete("/{id}", status_code=204)
async def delete_category(id: uuid.UUID, db: DBSession, current_user: CurrentUser):
    db_category = db.execute(
        select(Category).where(
        Category.id == id,
        Category.user_id == current_user.id
    )).scalar_one_or_none()

    if not db_category:
        raise_404("Category not found")

    # Soft delete
    db_category.deleted_at = datetime.now(timezone.utc)
    db.commit()

    return None

#RESTORE CATEGORY
@router.post("/{id}/restore", response_model=CategoryResponse)
async def restore_category(id: uuid.UUID, db: DBSession, current_user: CurrentUser):
    db_category = db.execute(
        select(Category).where(
            Category.id == id,
            Category.user_id == current_user.id,
            Category.deleted_at.is_not(None)
        )
    ).scalar_one_or_none()

    if not db_category:
        raise_404("Deleted category not found")

    db_category.deleted_at = None
    db.commit()
    db.refresh(db_category)
    
    return db_category