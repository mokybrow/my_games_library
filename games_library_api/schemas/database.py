import datetime
import uuid

from sqlalchemy import BINARY, JSON, UUID, Boolean, Column, DateTime, ForeignKey, Integer, LargeBinary, MetaData, String, Table, Text
from sqlalchemy.dialects.postgresql import ARRAY

metadata = MetaData()

user_table = Table(
    'user',
    metadata,
    Column('id', UUID, primary_key=True),
    Column('email', String, unique=True, index=True),
    Column('username', String, nullable=False, unique=True),
    Column('hashed_password', String),
    Column('is_active', Boolean, default=True),
    Column('is_superuser', Boolean, default=False),
    Column('is_verified', Boolean, default=False),
    Column('name', String, nullable=False),
    Column('surname', String, nullable=True),
    Column('birthdate', DateTime, nullable=True, default=None),
    Column('registr_at', DateTime, nullable=True, default=datetime.datetime.utcnow()),
    Column('gender', String, nullable=True),
    Column('img', String, nullable=True),
    Column('reporter', Boolean, default=False),
    Column('subscriber', Boolean, default=False),
)

game_table = Table(
    'game',
    metadata,
    Column('id', UUID, primary_key=True, default=uuid.uuid4()),
    Column('title', String, nullable=False),
    Column('cover', String, nullable=True),
    Column('description', String, nullable=True),
    Column('slug', String, nullable=False, unique=True),
    Column('release', DateTime, nullable=True),
    Column('playtime', Integer, nullable=True, unique=False),
    Column('platform', ARRAY(String), nullable=True, unique=False),
    Column('platform_name', ARRAY(String), nullable=True, unique=False),
    Column('parent_platform', ARRAY(String), nullable=True, unique=False),
    Column('genre', ARRAY(String), nullable=True, unique=False),
    Column('tags', ARRAY(String), nullable=True, unique=False),
    Column('esrb_rating', String, nullable=True, unique=False),
)

list_table = Table(
    'list',
    metadata,
    Column('id', UUID, primary_key=True, default=uuid.uuid4()),
    Column('owner_id', UUID, ForeignKey('user.id', ondelete='CASCADE')),
    Column('title', String, nullable=False),
    Column('slug', String, nullable=False),
    Column('cover', String, nullable=True),
    Column('description', String, nullable=True),
    Column('is_private', Boolean, default=False),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)

# таблица для хранения пользователей которые добавили ce6e другие списки
list_user_table = Table(
    'list_user',
    metadata,
    Column('list_id', UUID, ForeignKey('list.id', ondelete='CASCADE'), primary_key=True),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE')),
    Column('added', DateTime, default=datetime.datetime.utcnow()),
)

list_game_table = Table(
    'list_game',
    metadata,
    Column('list_id', UUID, ForeignKey('list.id', ondelete='CASCADE')),
    Column('game_id', UUID, ForeignKey('game.id', ondelete='CASCADE')),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)


follower_table = Table(
    'follower',
    metadata,
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('follower_id', UUID, ForeignKey('user.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('date', DateTime, default=datetime.datetime.utcnow()),
)


like_table = Table(
    'like',
    metadata,
    Column('id', UUID, primary_key=True, default=uuid.uuid4()),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE'), unique=True),
    Column('cover', String, nullable=False),
)


like_game_table = Table(
    'like_game',
    metadata,
    metadata,
    Column('list_id', UUID, ForeignKey('like.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('game_id', UUID, ForeignKey('game.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)

wantplay_table = Table(
    'wantplay',
    metadata,
    Column('id', UUID, primary_key=True, default=uuid.uuid4()),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE'), unique=True),
    Column('cover', String, nullable=False),
)


wantplay_game_table = Table(
    'wantplay_game',
    metadata,
    Column('list_id', UUID, ForeignKey('wantplay.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('game_id', UUID, ForeignKey('game.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)

passed_table = Table(
    'passed',
    metadata,
    Column('id', UUID, primary_key=True, default=uuid.uuid4()),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE'), unique=True),
    Column('cover', String, nullable=False),
)


passed_game_table = Table(
    'passed_game',
    metadata,
    Column('list_id', UUID, ForeignKey('passed.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('game_id', UUID, ForeignKey('game.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)


review_table = Table(
    'review',
    metadata,
    Column('id', UUID, primary_key=True, default=uuid.uuid4()),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE')),
    Column('game_id', UUID, ForeignKey('game.id', ondelete='CASCADE')),
    Column('grade', Integer, nullable=False),
    Column('comment', Text, nullable=True),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)

review_like_table = Table(
    'review_like',
    metadata,
    Column('review_id', ForeignKey('review.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)

news_table = Table(
    'news',
    metadata,
    Column('id', UUID, primary_key=True, default=uuid.uuid4()),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE')),
    Column('title', String, nullable=False),
    Column('cover', String, nullable=True),
    Column('text', Text, nullable=False),
    Column('slug', String, nullable=False),
    Column('publishing', Boolean, default=False),
)

news_like_table = Table(
    'news_like',
    metadata,
    Column('news_id', ForeignKey('news.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)

user_activity_table = Table(
    'user_activity',
    metadata,
    Column('id', UUID, primary_key=True, default=uuid.uuid4()),
    Column('user_id', UUID, ForeignKey('user.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('game_id', UUID, ForeignKey('game.id', ondelete='CASCADE'), primary_key=True, unique=False),
    Column('title', String, nullable=False),
    Column('slug', String, nullable=False),
    Column('cover', String, nullable=True),
    Column('activity_type', String, nullable=False),
    Column('created_at', DateTime, default=datetime.datetime.utcnow()),
)
