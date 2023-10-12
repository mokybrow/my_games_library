"""empty message

Revision ID: 412e7267dade
Revises: 7d6689421396
Create Date: 2023-10-12 20:21:34.012099

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '412e7267dade'
down_revision: Union[str, None] = '7d6689421396'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user_activity', 'created_at',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user_activity', 'created_at',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###
