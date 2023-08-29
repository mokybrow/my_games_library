"""новые таблицы

Revision ID: 91d5fc1be3db
Revises: 35394e8537bf
Create Date: 2023-08-29 19:00:29.041615

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "91d5fc1be3db"
down_revision: Union[str, None] = "35394e8537bf"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("like_game_game_id_key", "like_game", type_="unique")
    op.drop_constraint("list_game_game_id_key", "list_game", type_="unique")
    op.alter_column("list_user", "list_id", existing_type=sa.UUID(), nullable=False)
    op.drop_constraint("passed_game_game_id_key", "passed_game", type_="unique")
    op.drop_constraint("wantplay_game_game_id_key", "wantplay_game", type_="unique")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(
        "wantplay_game_game_id_key", "wantplay_game", ["game_id"]
    )
    op.create_unique_constraint("passed_game_game_id_key", "passed_game", ["game_id"])
    op.alter_column("list_user", "list_id", existing_type=sa.UUID(), nullable=True)
    op.create_unique_constraint("list_game_game_id_key", "list_game", ["game_id"])
    op.create_unique_constraint("like_game_game_id_key", "like_game", ["game_id"])
    # ### end Alembic commands ###
