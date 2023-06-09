"""empty message

Revision ID: 511917c4be4f
Revises: 
Create Date: 2023-05-31 12:21:52.915300

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '511917c4be4f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('player', schema=None) as batch_op:
        batch_op.add_column(sa.Column('age', sa.Integer(), nullable=True))
        batch_op.drop_column('date_of_birth')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('player', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_of_birth', sa.DATE(), nullable=True))
        batch_op.drop_column('age')

    # ### end Alembic commands ###
