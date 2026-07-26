import os
import sys

project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if project_root not in sys.path:
    sys.path.append(project_root)

from sqlalchemy import select
from api.core.database import SessionLocal
from api.categories.models import Category

import api.models

SYSTEM_CATEGORIES = [
    "Backpack", "Shelter", "Sleep System", "Sleep Pad",
    "Water Filter", "Cooking System", "Food", "Layers / Clothing",
    "Rain Gear", "Navigation", "First Aid", "Fire Starting",
    "Lighting", "Hygiene", "Other"
]

def seed_categories():
    print("Seeding system categories...")
    db = SessionLocal()
    try:
        for title in SYSTEM_CATEGORIES:
            exists = db.execute(
                select(Category).where(Category.user_id == None, Category.title == title)
            ).scalar_one_or_none()

            if not exists:
                db.add(Category(title=title, user_id=None, is_default=True))
                print(f"  Created: {title}")
            else:
                print(f"  Exists: {title}")

        db.commit()
        print("Categories seeded successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_categories()