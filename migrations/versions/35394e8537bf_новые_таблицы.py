"""новые таблицы

Revision ID: 35394e8537bf
Revises: e23716e2d632
Create Date: 2023-08-29 18:58:53.220042

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '35394e8537bf'
down_revision: Union[str, None] = 'e23716e2d632'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'like_game', ['game_id'])
    op.create_unique_constraint(None, 'list_game', ['game_id'])
    op.create_unique_constraint(None, 'passed_game', ['game_id'])
    op.create_unique_constraint(None, 'wantplay_game', ['game_id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'wantplay_game', type_='unique')
    op.drop_constraint(None, 'passed_game', type_='unique')
    op.drop_constraint(None, 'list_game', type_='unique')
    op.drop_constraint(None, 'like_game', type_='unique')
    # ### end Alembic commands ###
