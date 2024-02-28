#import durak_class as du
#from typing import  List,Optional
from motor.motor_asyncio import AsyncIOMotorClient
#from pydantic import BaseModel
import json
from beanie import Document, Indexed, init_beanie



class Dum(Document):
        deck:list
        active_suit:str
        attacker:list
        defender:list
        players:list
        passes:int
        target:int
        deck_id:list
        iid:str
        name:str
        cach:list

async def init_mongo():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    return client 


async def example(du):

    client =await init_mongo()

    await init_beanie(database=client.durak, document_models=[Dum])
   
    tonybar =Dum(deck=du.deck,active_suit=du.active_suit,attacker=du.attacker,defender=du.attacker,
                 players=du.players,passes=du.passes,target=du.target,deck_id=du.deck_id,iid=du.id,name=du.name,cach=[[],[],[],[]])
    await tonybar.insert()

async def example_dell(name):
   
    client =await init_mongo()
    await init_beanie(database=client.durak, document_models=[Dum])
    await Dum.find_one(Dum.name == name).delete()

async def example_get(e):
    if e.get("taks")==None:
   
        client =await init_mongo()
        await init_beanie(database=client.durak, document_models=[Dum])
        t=str(e.get("name"))
    #print(t)
        game=await Dum.find_one(Dum.name == t)
   # print(t)
        a=int(e.get("players"))
        b=int(e.get("pos"))
    #c=game.players[a][b]
        game.players[a][b]=None
    #ind=game.players[a].index(c)
    #print(c)
        game.cach=e.get("cach")
    #print(game.cach)
    #game.players[a].pop(ind) 
   
        await game.save()
    
   
