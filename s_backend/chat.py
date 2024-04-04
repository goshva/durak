import json
async def router(e,clients,client):
     tp=e.get("type")
     name=e.get("name")
     msg=e.get("message")
     id=e.get("id")
     ids=str(client.id)
     idm=e.get("idm")
     message={'type':tp,'name':name,'id':ids,'message':msg}
     if idm==None:
          await socket(id,message,clients)
     


async def socket(id,msg,clients):
    for client in clients:
         if id==str(client.id):
                await client.send(json.dumps(msg))
