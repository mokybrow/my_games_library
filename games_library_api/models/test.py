from datetime import datetime

import sqlalchemy
from sqlalchemy import BigInteger, MetaData, Table, String, JSON

metadata = MetaData()

states_table = Table(
    'states',
    metadata,
    sqlalchemy.Column('state_id', BigInteger, primary_key=True),
    sqlalchemy.Column('text', String),
    sqlalchemy.Column('buttons', JSON, nullable=True),
)