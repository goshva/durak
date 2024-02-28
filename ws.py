#!/usr/bin/env python
import durak_class as du
import json
#import pathlib
#import ssl
import asyncio
import websockets
#import ws_redis as rs
import json
import durak_controller as mrm
import dum as mg
#import requests

#ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#localhost_pem = pathlib.Path(__file__).with_name("key_cert.pem")
#ssl_context.load_cert_chain(localhost_pem)
#resp = requests.get('url')
#print(resp.json())



clients = set()
#clients0 = set()
clients2 = set()
clients3 = set()
clients4 = set()

async def choosing_path(path):
    if path=='/2':
         return clients2
    if path=='/3':
         return clients3
    if path=='/4':
         return clients4
    else:
         return 0     




async def socket0(client,msg):
    #print(msg)
    await client.send(msg)


async def router(e):
    gamers=e.get("deck_id")
    #print(gamers)
    for g in gamers:
         await socket(g,e)
    await mg.example_get(e)     


async def socket(g,e):
    for client in clients:
         if g==str(client.id):
                await client.send(json.dumps(e))    
           
async def socketjson(g,cl):
    s= cl   
    i=0
    for client in s:
            g.target=i
            g.id=str(client.id)
            i +=1
            await client.send(json.dumps(g.__dict__, ensure_ascii=False))
            

async def cln(rout,cl,clients0):
     s= clients0.copy()
     clients.add(cl)
     clients0.discard(cl)
     s.discard(cl) 
     m=[cl]
     i=1
     for client in s:
          await client.send(json.dumps({"connect":rout}))
          m.append(client)
          clients.add(client)
          clients0.discard(client)
          i+=1
          if i==rout:
               break
         
     #print(len(m))     
     return m   
       


async def broadcast(client,message,clients0,rout):
    i=len(clients0)
    i1=len(clients)
    print(f"len clients:{i1}")
    print(f"len clients0:{i}")
    try:
        e=await mrm.socket_messj(message)
        et=e.get("type")
        #en=e.get("n")
        if et=="start" and (i>1 and i>=rout):#если есть игроки и кол-во больш или равно роуту/2 /3 /4
            await client.send(json.dumps({"connect":rout}))
            new_clients=await cln(rout,client,clients0) #создаем массив игроков экземпл игры и удаляем из client0
            x=[(str(client.id)) for client in new_clients]
            game = du.DurakGame(rout)
            game_state = game.play_game()
            game_state.name=x[0]
            game_state.deck_id=x
            await mg.example(game_state) #DurakGame insert in Mongodb
            await socketjson(game_state,new_clients)#send msg players
        if et=="hi" and i>0:
            await socket0(client,json.dumps({"id":str(client.id)}))
        if et=="set":
            await router(e)
    finally:
          return 0

async def handle_client(client, path):
    rout=int(path[1])
    clients0=await choosing_path(str(path))
    clients0.add(client)
    
    try:
        message = await client.recv()
        async for message in client:
            await broadcast(client,message,clients0,rout)
    finally:
            clients0.discard(client)
            clients.discard(client)
            await mg.example_dell(str(client.id))
            print(f"close clients2:{len(clients2)},clients3:{len(clients3)},clients4:{len(clients4)}")
            print(f"len clients close:{len(clients)}")


async def start_server():
    async with websockets.serve(handle_client, "0.0.0.0", 8765): #, ssl=ssl_context):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())


#python -m http.server   localhost:8080/index.html
#python ws.py
#python -m pip install motor
#pip install beanie
