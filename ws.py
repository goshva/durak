#!/usr/bin/env python
import durak_class as du
import json
#import pathlib
#import ssl
import asyncio
import websockets
import json
import durak_controller as mrm
#import requests

#ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#localhost_pem = pathlib.Path(__file__).with_name("key_cert.pem")
#ssl_context.load_cert_chain(localhost_pem)
#resp = requests.get('url')
#print(resp.json())


clients = set()

async def socket(message):
    for client in clients:
            await client.send(message)
async def socketjson(g):
    x=[(str(client.id)) for client in clients]
    i=0
    for client in clients:
            g.deck_id =x
            g.target=i
            g.id=str(client.id)
            i +=1
            await client.send(json.dumps(g.__dict__, ensure_ascii=False))            

async def broadcast(client,message):
    i=len(clients)
    print(i)
    print(client.id)
    e=await mrm.socket_messj(message)
    if i>1 and e=="start":
      game = du.DurakGame(i)
      game_state = game.play_game()
      await socketjson(game_state)
    if i>0 and e=="hi":
       await socket(json.dumps({"id":str(client.id)}))

async def handle_client(client, path): 
    clients.add(client)
    try:
        async for message in client:
            await broadcast(client,message)
    finally:
        clients.remove(client)

async def start_server():
    async with websockets.serve(handle_client, "0.0.0.0", 8765): #, ssl=ssl_context):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())
#python -m http.server
