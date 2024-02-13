#import durak_class as du
#from typing import  List,Optional
from motor.motor_asyncio import AsyncIOMotorClient
#from pydantic import BaseModel

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

async def init_mongo():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    return client 


async def example(du):

    client =await init_mongo()

    await init_beanie(database=client.durak, document_models=[Dum])
   
    tonybar =Dum(deck=du.deck,active_suit=du.active_suit,attacker=du.attacker,defender=du.attacker,
                 players=du.players,passes=du.passes,target=du.target,deck_id=du.deck_id,iid=du.id,name=du.name)
    await tonybar.insert()

async def example_dell(name):
   
    client =await init_mongo()
    await init_beanie(database=client.durak, document_models=[Dum])
    await Dum.find_one(Dum.name == name).delete()

async def example_get(name):
   
    client =await init_mongo()
    await init_beanie(database=client.durak, document_models=[Dum])
    return await Dum.find_one(Dum.name == name) 