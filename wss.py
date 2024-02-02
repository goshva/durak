#!/usr/bin/env python
import durak_class as du
import json
#import pathlib
#import ssl
import asyncio
import websockets
import json






j1=open("durak/2.json", "r").read()

j2=open("durak/3.json", "r").read()

j3=open("durak/3.json", "r").read()

#import requests

#ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#localhost_pem = pathlib.Path(__file__).with_name("key_cert.pem")
#ssl_context.load_cert_chain(localhost_pem)
#resp = requests.get('url')
#print(resp.json())


clients = set()

async def broadcast(message):
    
    i=len(clients)
    print(i)
    if i==2:
       
        await asyncio.wait([client.send(json.dumps(j1))for client in clients])
    if i==3:
       
        await asyncio.wait([client.send(json.dumps(j2))for client in clients]) 
      
    else:
        game = du.DurakGame(i)
        game_state = game.play_game()
        massmessage = json.dumps(game_state.__dict__, ensure_ascii=False)
        await asyncio.wait([client.send(massmessage) for client in clients])
       
       

async def handle_client(websocket, path):
    print(websocket)
    clients.add(websocket)
    try:
        async for message in websocket:
            await broadcast(message)
    finally:
        clients.remove(websocket)

async def start_server():
    async with websockets.serve(handle_client, "0.0.0.0", 8765): #, ssl=ssl_context):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())
