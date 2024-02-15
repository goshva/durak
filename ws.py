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
clients0 = set()

async def socket0(client,msg):
   
    await client.send(msg)


async def router(e):
    gamers=e.get("deck_id")
    #print(gamers)
    for g in gamers:
         await socket(g,e)


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
            

async def cln(en,cl):
     s= clients0.copy()
     clients.add(cl)
     clients0.discard(cl)
     s.discard(cl) 
     m=[cl]
     i=1
     for client in s:
          await client.send(json.dumps({"connect":en}))
          m.append(client)
          clients.add(client)
          clients0.discard(client)
          i+=1
          if i==en:
               break
         
     print(len(m))     
     return m   
       


async def broadcast(client,message):
    i=len(clients0)
    i1=len(clients)
    print(f"len clients{i1}")
    print(i)
    e=await mrm.socket_messj(message)
    et=e.get("type")
    en=e.get("n")
    if (i>1 and i>=int(en)) and et=="start":
       await client.send(json.dumps({"connect":en}))
       new_clients=await cln(int(en),client)
       x=[(str(client.id)) for client in new_clients]
       game = du.DurakGame(int(en))
       game_state = game.play_game()
       game_state.name=x[0]
       game_state.deck_id=x
       await mg.example(game_state)
       await socketjson(game_state,new_clients)
    if i>0 and et=="hi":
       await socket0(client,json.dumps({"id":str(client.id)}))
    if et=="set":
       await router(e)


async def handle_client(client, path):
    clients0.add(client)
    #print(client)
    try:
        message = await client.recv()
        async for message in client:
            await broadcast(client,message)
    finally:
            clients0.discard(client)
            clients.discard(client)
            await mg.example_dell(str(client.id))
            print(len(clients0))
            print(len(clients))


async def start_server():
    async with websockets.serve(handle_client, "0.0.0.0", 8765): #, ssl=ssl_context):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())


#python -m http.server   localhost:8080/index.html
#python ws.py
#python -m pip install motor
#pip install beanie
