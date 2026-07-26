import os
import sys
from datetime import datetime, timezone, timedelta

project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if project_root not in sys.path:
    sys.path.append(project_root)

from sqlalchemy import select
from api.core.database import SessionLocal
from api.users.models import User
from api.categories.models import Category
from api.gear_items.models import GearItem
from api.trips.models import Trip
from api.trip_items.models import TripItem
from api.core.enums import WeightUnit

MOCK_CLERK_ID = os.getenv("DEV_CLERK_ID", "dev_clerk_id_123")

GEAR_DATA = [
    {"name": "Osprey Exos 58", "brand": "Osprey", "weight_grams": 1200, "category": "Backpack"},
    {"name": "Big Agnes Fly Creek HV UL2", "brand": "Big Agnes", "weight_grams": 1000, "category": "Shelter"},
    {"name": "Enlightened Equipment Revelation 20", "brand": "EE", "weight_grams": 600, "category": "Sleep System"},
    {"name": "Therm-a-Rest NeoAir XLite", "brand": "Therm-a-Rest", "weight_grams": 350, "category": "Sleep Pad"},
    {"name": "Sawyer Squeeze", "brand": "Sawyer", "weight_grams": 85, "category": "Water Filter"},
    {"name": "Jetboil Flash", "brand": "Jetboil", "weight_grams": 400, "category": "Cooking System"},
    {"name": "Black Diamond Spot 350", "brand": "Black Diamond", "weight_grams": 86, "category": "Lighting"},
]

def seed_mock():
    print("Seeding mock data...")
    db = SessionLocal()
    try:
        # 1. User
        user = db.execute(
            select(User).where(User.clerk_id == MOCK_CLERK_ID)
        ).scalar_one_or_none()

        if not user:
            user = User(
                clerk_id=MOCK_CLERK_ID,
                is_active=True,
                weight_unit=WeightUnit.GRAMS,
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            print(f"  Created user: {MOCK_CLERK_ID}")
        else:
            print(f"  User exists: {MOCK_CLERK_ID}")

        # 2. Gear Items
        gear_items = {}
        for item in GEAR_DATA:
            category = db.execute(
                select(Category).where(Category.user_id == None, Category.title == item["category"])
            ).scalar_one_or_none()

            if not category:
                print(f"  WARNING: Category '{item['category']}' not found, run seed_categories first")
                continue

            gear = db.execute(
                select(GearItem).where(GearItem.user_id == user.id, GearItem.name == item["name"])
            ).scalar_one_or_none()

            if not gear:
                gear = GearItem(
                    name=item["name"],
                    brand=item["brand"],
                    weight_grams=item["weight_grams"],
                    user_id=user.id,
                    category_id=category.id,
                )
                db.add(gear)
                print(f"  Created gear: {item['name']}")
            else:
                print(f"  Exists: {item['name']}")
            gear_items[item["name"]] = gear

        db.commit()

        # 3. Trip
        trip = db.execute(
            select(Trip).where(Trip.user_id == user.id, Trip.name == "Grand Canyon Adventure")
        ).scalar_one_or_none()

        if not trip:
            trip = Trip(
                name="Grand Canyon Adventure",
                description="A multi-day hike through the Grand Canyon.",
                location="Arizona, USA",
                start_date=datetime.now(timezone.utc) + timedelta(days=30),
                user_id=user.id,
            )
            db.add(trip)
            db.commit()
            db.refresh(trip)
            print(f"  Created trip: {trip.name}")
        else:
            print(f"  Trip exists: {trip.name}")

        # 4. Trip Items
        for gear_name, gear in gear_items.items():
            exists = db.execute(
                select(TripItem).where(TripItem.trip_id == trip.id, TripItem.gear_item_id == gear.id)
            ).scalar_one_or_none()

            if not exists:
                db.add(TripItem(
                    trip_id=trip.id,
                    gear_item_id=gear.id,
                    quantity=1,
                    recorded_weight=gear.weight_grams,
                    recorded_name=gear.name,
                    is_packed=False,
                ))
                print(f"  Added to trip: {gear_name}")
            else:
                print(f"  Trip item exists: {gear_name}")

        db.commit()
        print("Mock data seeded successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_mock()