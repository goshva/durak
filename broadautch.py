from motor.motor_asyncio import AsyncIOMotorClient
#from pydantic import BaseModel
import json
from beanie import Document, Indexed, init_beanie
import secrets
class User(Document):
        name:str
        password:str
        frends_name:list
        email:str
        salt:str
        postmessage:list



async def broadkast_router(client,message):
    data=json.loads(message)
    
    type=data.get("type")
    if type=="hi":
         await client.send(json.dumps({"id":str(client.id)}))
         print(data)
    if type=="init-user":
         await example(data,client)
    if type=="connect-user" and data.get("autorisation")!=None :
         await example_get(data,client)
         print(data)   


async def init_mongo():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    return client 

async def example(data,client):
    user_name=data.get("user")
    user_password=data.get("password")

    _client =await init_mongo()
    await init_beanie(database=_client.durak, document_models=[User])
    result=await User.find_one(User.name ==user_name )
    if result and result.name==user_name:
         message={'type':'autorisation','error':"the name already exists"}
         response= json.dumps(message)
         await client.send(response)
    else:
        user_ind=data.get("index")
        join_key = secrets.token_urlsafe(12)
        uzer =User(name=user_name,password=user_password,salt=join_key,frends_name=[],postmessage=[],email='')
        await uzer.insert()
        message={'type':'autorisation','token':join_key,'index':user_ind}
        response= json.dumps(message)
        await client.send(response)

async def example_dell(name):
   
    client =await init_mongo()
    await init_beanie(database=client.durak, document_models=[User])
    await User.find_one(User.name == name).delete()

async def example_get(data,client):
    _client =await init_mongo()
    await init_beanie(database=_client.durak, document_models=[User])
    name=str(data.get("autorisation"))
    token=str(data.get("token"))
    result=await User.find_one(User.name ==name )
    if result and result.salt==token:
        message={'type':'susses'}
        response= json.dumps(message)
        await client.send(response)
    if result and result.salt!=token:
        message={'type':'susses',"error":"invalid token"}
        response= json.dumps(message)
        await client.send(response) 
    else :
        message={'type':'susses',"error":"invalid token"}
        response= json.dumps(message)
        await client.send(response)    
         

def autch(client,message,clients0,rout):
    i=len(clients0)
    print(f"len clients0:{i}")