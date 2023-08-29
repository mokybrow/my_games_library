import datetime
import uuid

from sqlalchemy import (
    JSON,
    TIMESTAMP,
    UUID,
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    MetaData,
    String,
    Table,
    Text,
)

metadata = MetaData()

user_table = Table(
    "user",
    metadata,
    Column("id", UUID, primary_key=True),
    Column("email", String, unique=True, index=True),
    Column("hashed_password", String),
    Column("is_active", Boolean, default=True),
    Column("is_superuser", Boolean, default=False),
    Column("is_verified", Boolean, default=False),
    Column("username", String, nullable=False, unique=True),
    Column("name", String, nullable=False),
    Column("surname", String, nullable=True),
    Column("birthdate", DateTime, nullable=True, default=None),
    Column("gender", String, nullable=True),
)

game_table = Table(
    "game",
    metadata,
    Column("id", UUID, primary_key=True, default=uuid.uuid4()),
    Column("title", String, nullable=False),
    Column("cover", String, nullable=True),
    Column("description", String, nullable=True),
    Column("slug", String, nullable=False, unique=True),
    Column("release", DateTime, nullable=False),
    Column("platform", JSON, nullable=False),
)

list_table = Table(
    "list",
    metadata,
    Column("id", UUID, primary_key=True, default=uuid.uuid4()),
    Column("owner_id", UUID, ForeignKey("user.id")),
    Column("name", String, nullable=False),
    Column("cover", String, nullable=True),
    Column("description", String, nullable=True),
    Column("is_private", Boolean, default=False),
    Column("created_at", DateTime, default=datetime.datetime.utcnow()),
)

list_user_table = Table(
    "list_user",
    metadata,
    Column("list_id", UUID, ForeignKey("list.id"), primary_key=True),
    Column("user_id", UUID, ForeignKey("user.id")),
    Column("added", DateTime, default=datetime.datetime.utcnow()),
)

list_game_table = Table(
    "list_game",
    metadata,
    Column("list_id", UUID, ForeignKey("list.id")),
    Column("game_id", UUID, ForeignKey("game.id")),
    Column("created_at", DateTime, default=datetime.datetime.utcnow()),
)


follower_table = Table(
    "follower",
    metadata,
    Column("user_id", UUID, ForeignKey("user.id"), primary_key=True),
    Column("follower_id", UUID, ForeignKey("user.id")),
    Column("date", DateTime, default=datetime.datetime.utcnow()),
)


like_table = Table(
    "like",
    metadata,
    Column("id", UUID, primary_key=True, default=uuid.uuid4()),
    Column("user_id", UUID, ForeignKey("user.id"), unique=True),
    Column("cover", String, nullable=False),
)


like_game_table = Table(
    "like_game",
    metadata,
    metadata,
    Column("list_id", UUID, ForeignKey("like.id")),
    Column("game_id", UUID, ForeignKey("game.id")),
    Column("created_at", DateTime, default=datetime.datetime.utcnow()),
)

wantplay_table = Table(
    "wantplay",
    metadata,
    Column("id", UUID, primary_key=True, default=uuid.uuid4()),
    Column("user_id", UUID, ForeignKey("user.id"), unique=True),
    Column("cover", String, nullable=False),
)


wantplay_game_table = Table(
    "wantplay_game",
    metadata,
    Column("list_id", UUID, ForeignKey("wantplay.id")),
    Column("game_id", UUID, ForeignKey("game.id")),
    Column("created_at", DateTime, default=datetime.datetime.utcnow()),
)

passed_table = Table(
    "passed",
    metadata,
    Column("id", UUID, primary_key=True, default=uuid.uuid4()),
    Column("user_id", UUID, ForeignKey("user.id"), unique=True),
    Column("cover", String, nullable=False),
)


passed_game_table = Table(
    "passed_game",
    metadata,
    Column("list_id", UUID, ForeignKey("passed.id")),
    Column("game_id", UUID, ForeignKey("game.id")),
    Column("created_at", DateTime, default=datetime.datetime.utcnow()),
)


review_table = Table(
    "review",
    metadata,
    Column("id", UUID, primary_key=True, default=uuid.uuid4()),
    Column("user_id", UUID, ForeignKey("user.id")),
    Column("game_id", UUID, ForeignKey("game.id")),
    Column("grade", Integer, nullable=False),
    Column("comment", Text, nullable=True),
    Column("created_at", DateTime, default=datetime.datetime.utcnow()),
)
