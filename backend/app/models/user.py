from datetime import datetime

from sqlalchemy import BigInteger, Boolean, DateTime, SmallInteger, String, Text
from sqlalchemy.dialects.postgresql import CITEXT, ENUM
from sqlalchemy.orm import Mapped, mapped_column
from app.models import Base




user_role_enum = ENUM(
    "applicant",
    "admin",
    name="user_role",
    create_type=False
)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        CITEXT,
        nullable=False,
        unique=True
    )

    password_hash: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    role: Mapped[str] = mapped_column(
        user_role_enum,
        nullable=False
    )

    roll_no: Mapped[str | None] = mapped_column(
        String(20),
        unique=True
    )

    department: Mapped[str | None] = mapped_column(
        String(100)
    )

    society: Mapped[str | None] = mapped_column(
        String(100)
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False
    )

    failed_attempts: Mapped[int] = mapped_column(
        SmallInteger,
        nullable=False
    )

    locked_until: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True)
    )

    last_login_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True)
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )