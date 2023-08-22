from sqlalchemy import Integer, Column, MetaData, String, Table

metadata = MetaData()

students = Table(
   'students', metadata, 
   Column('id', Integer, primary_key = True), 
   Column('name', String), 
   Column('lastname', String),
)