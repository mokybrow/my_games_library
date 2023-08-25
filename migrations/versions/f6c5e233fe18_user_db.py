"""user db

Revision ID: f6c5e233fe18
Revises: 98170eff5578
Create Date: 2023-08-25 18:56:56.513430

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f6c5e233fe18'
down_revision: Union[str, None] = '98170eff5578'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('user_username_key', 'user', type_='unique')
    op.drop_column('user', 'username')
    op.drop_column('user', 'surname')
    op.drop_column('user', 'birthdate')
    op.drop_column('user', 'name')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('user', sa.Column('birthdate', sa.DATE(), autoincrement=False, nullable=True))
    op.add_column('user', sa.Column('surname', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('user', sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.create_unique_constraint('user_username_key', 'user', ['username'])
    # ### end Alembic commands ###
