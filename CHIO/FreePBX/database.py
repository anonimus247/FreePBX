from peewee import *

DB = MySQLDatabase(
    user='root',
    password='12345678',
    host='192.168.1.71', #conexion a la base de datos
    port=3306,
    database='asteriskcdrdb'
)


# Definimos la clave primaria utilizando PrimaryKeyField
class Cdr(Model):
    calldate = DateField()
    src = CharField()#para tomar los campos de las tablas de asterisk
    dst = CharField()
    duration = IntegerField()
    disposition = CharField()

    class Meta:
        database = DB
        table_name = 'cdr'
        primary_key = False  # No necesitamos una clave primaria explícita si no tenemos una columna id
