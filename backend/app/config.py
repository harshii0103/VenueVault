import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = "VenueVault"
DATABASE_URL = os.getenv("DATABASE_URL")