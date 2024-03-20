from motor.motor_asyncio import AsyncIOMotorClient
#from pydantic import BaseModel
import json
from beanie import Document, Indexed, init_beanie
import secrets
import bcrypt
class User(Document):
        name:str
        hash:str
        frends_name:list
        email:str
        token:str
        postmessage:list



async def broadkast_router(client,message):
    data=json.loads(message)
    
    type=data.get("type")
    print(type)
    if type=="hi":
         await client.send(json.dumps({"id":str(client.id)}))
         print(data)
    if type=="init-user":
         await example(data,client)
    if type=="connect-user" and data.get("autorisation")!=None :
         await example_get(data,client)
         print(data)  

    if type=="uninstall-user" :
         await  example_dell(data)
         print(data)       


async def init_mongo():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    return client 

async def example(data,client):
    user_name=data.get("user")
    user_password=bytes(data.get("password"),'utf-8')

    _client =await init_mongo()
    await init_beanie(database=_client.durak, document_models=[User])
    result=await User.find_one(User.name ==user_name )
    if result and result.name==user_name:
         message={'type':'autorisation','error':"the name already exists"}
         response= json.dumps(message)
         await client.send(response)
    else:
        user_ind=data.get("index")
        join_key = secrets.token_urlsafe(12)#will be needed later
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(user_password, salt)
        uzer =User(name=user_name,hash=hashed,token=join_key,frends_name=[],postmessage=[],email='')
        await uzer.insert()
        message={'type':'autorisation','token':join_key,'index':user_ind,'name':user_name}
        response= json.dumps(message)
        await client.send(response)

async def example_dell(data):
    user_token=str(data.get("token"))
    #name=str(data.get("name"))
    client =await init_mongo()
    await init_beanie(database=client.durak, document_models=[User])
    await User.find_one(User.token == user_token).delete()

async def example_get(data,client):
    _client =await init_mongo()
    await init_beanie(database=_client.durak, document_models=[User])
    name=str(data.get("autorisation"))
    token=str(data.get("token"))#will be needed later
    passwd=str(data.get("password"))
    pws=bytes(passwd, 'utf-8')
    result=await User.find_one(User.name ==name )
    phs=bytes(result.hash, 'utf-8')
    bkp=bcrypt.checkpw(pws,phs)
    if result and bkp:
        message={'type':'susses','name':result.name}
        response= json.dumps(message)
        await client.send(response)
    if result and bkp==None:
        message={'type':'susses',"error":"invalid password"}
        response= json.dumps(message)
        await client.send(response) 
    else :
        if result==None:
            message={'type':'susses',"error":"not name {name}"}
            response= json.dumps(message)
            await client.send(response)    
         

def autch(client,message,clients0,rout):
    i=len(clients0)
    print(f"len clients0:{i}")
