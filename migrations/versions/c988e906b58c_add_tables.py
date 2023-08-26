"""add tables

Revision ID: c988e906b58c
Revises: 2a94a6dfe9b8
Create Date: 2023-08-26 18:27:48.857905

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "c988e906b58c"
down_revision: Union[str, None] = "2a94a6dfe9b8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("like", sa.Column("cover", sa.String(), nullable=False))
    op.add_column("passed", sa.Column("cover", sa.String(), nullable=False))
    op.add_column("wantplay", sa.Column("cover", sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("wantplay", "cover")
    op.drop_column("passed", "cover")
    op.drop_column("like", "cover")
    # ### end Alembic commands ###
