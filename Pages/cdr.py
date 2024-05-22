from database import Cdr

async def get_all_records():

    cdr_info = list(Cdr.select())

    return [
        {
            "calldate" : cdr.calldate,
            "src" : cdr.src, #aqui retorna los valores como un objeto las tablas de asterisk
            "dst" : cdr.dst,
            "duration" : cdr.duration,
            "disposition" : cdr.disposition,
        } 

        for cdr in cdr_info]
