from fastapi import FastAPI

from database import DB as connection 
from database import Cdr

import Pages.cdr as p_cdr

app = FastAPI(title="Freepbx", description="Llamadas", version='1.0.1')



from fastapi.middleware.cors import CORSMiddleware


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,     #aqui se dan los permisos a angular
    allow_methods=["*"],
    allow_headers=["*"]
)


#region Inicio del servidor
@app.on_event('startup')
def startup():

    if connection.is_closed():
        connection.connect()

    connection.create_tables([Cdr])


@app.on_event('shutdown')
def shutdown():

    if not connection.is_closed():
            connection.close()

#endregion

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get('/cdr/consulta/', tags=["cdr"])
async def get_all_records():
    return await p_cdr.get_all_records()
#python -m uvicorn main:app --reload