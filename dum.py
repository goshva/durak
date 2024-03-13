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
        roles:list
        iid:str
        name:str
        cach:list
        deck_back:list
        passes:int

async def init_mongo():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    return client 


async def example(du):

    client =await init_mongo()

    await init_beanie(database=client.durak, document_models=[Dum])
   
    tonybar =Dum(deck=du.deck,active_suit=du.active_suit,attacker=du.attacker,defender=du.attacker,
    players=du.players,passes=du.passes,target=du.target,deck_id=du.deck_id,iid=du.id,name=du.name,cach=[[],[],[],[]],deck_back=[],roles=du.pl_roles,)
    await tonybar.insert()
#удалить клиента
async def example_dell(name):
   
    client =await init_mongo()
    await init_beanie(database=client.durak, document_models=[Dum])
    await Dum.find_one(Dum.name == name).delete()
#внести изменения
async def example_get(e,rout):
    client =await init_mongo()
    await init_beanie(database=client.durak, document_models=[Dum])
    t=str(e.get("name"))
    game=await Dum.find_one(Dum.name == t)
    if e.get("taks")==None:
        a=int(e.get("players"))
        b=int(e.get("pos"))
    #c=game.players[a][b]
        y=game.players[a][b]
        game.cach[a].append(y)
        game.players[a][b]=None
    #ind=game.players[a].index(c)
    #print(c)
        game.passes=e.get("passes")
        #game.cach=e.get("cach")
    #print(game.cach)
    #game.players[a].pop(ind) 
        
        await game.save()
        return 0
    if e.get("taks")!=None:
        print("taks")
        t=e.get("taks")
        u=e.get("players")
        role=e.get("role")
        if role=="defender" and rout==2:
            print(role)
            n =game.cach[int(t)]
            nn =game.cach[int(u)]
           
            #game.players[int(u)]
            for i in n:
                game.players[int(u)].append(i)
                
            for i in nn:   
                game.players[int(u)].append(i)
            game.cach[int(t)].clear()    
            game.cach[int(u)].clear()   
            await sortdek(game.players[int(u)])
            await sortdek(game.players[int(t)])
            n6 = len(game.players[int(t)])
            nn6=6-n6
            if nn6>0:
                await popdek(game.deck,game.players[int(t)],nn6)     

            await game.save()
            response={'type':'round-taks','deck':game.deck,'players':game.players,'roles':game.roles,'cach':game.cach,'deck_back':game.deck_back,'deck_id':game.deck_id,'bito':False}
            #print(json.dumps(response))
            return json.dumps(response)
        if role=="defender" and rout>2:
            print(rout)
            ui=int(u)
            for ie in range(rout):
                print(ie)
                for i in game.cach[ie]:game.players[ui].append(i)
                game.cach[ie].clear()      
                await sortdek(game.players[ie])
                n6 = len(game.players[ie])
                nn6=6-n6
                if nn6>0:
                    await popdek(game.deck,game.players[ie],nn6)
            print('end')        
            await game.save() 
            response={'type':'round-taks','deck':game.deck,'players':game.players,'roles':game.roles,'cach':game.cach,'deck_back':game.deck_back,'deck_id':game.deck_id,'bito':False}
            return json.dumps(response)     





        if role=="attacker" or role=="attacker2":
            print(role)
            num = len(game.players)
            for ie in range(num):
                print(ie)
                await sortdek(game.players[ie])
                nn = len(game.players[ie])
                nn6=6-nn
                if nn6>0:
                    await popdek(game.deck,game.players[ie],nn6)
                await back_dek(game.cach,ie,game.deck_back)
                game.cach[ie].clear()                              
            await game.save()
            response={'type':'round-taks','deck':game.deck,'players':game.players,'roles':game.roles,'cach':game.cach,'deck_back':game.deck_back,'deck_id':game.deck_id,'bito':True}
            return json.dumps(response) 
async def sortdek(gm):
    for i in range(2):
       for i in gm:
            if not i!=None:
                gm.remove(i)

async def popdek(gmd,gm,nn6):
   for ii in range(nn6):
        y=gmd.pop(-1)
        if y !=None:
           gm.append(y)  

async def back_dek(game_cach,num,game_deck_back):
    
        for x in game_cach[num]:
            if x!=None:
                game_deck_back.append(x)
                #game_cach[num].remove(x)

