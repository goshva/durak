#!/usr/bin/env python
import durak_class as du
import json
import pathlib
import ssl
import asyncio
import websockets
import json

#ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#localhost_pem = pathlib.Path(__file__).with_name("key_cert.pem")
#ssl_context.load_cert_chain(localhost_pem)
j11=open("durak/2.json", "r")
j1=j11.read()
j11.close()

j22=open("durak/3.json", "r")
j2=j22.read()
j22.close()





clients = set()


async def socket(message):
    for client in clients:
            await client.send(message)

async def broadcast(message):
    i=len(clients)
    print(i)
    if i==2:
       await socket(json.dumps(j1))
    if i==3:
       await socket(json.dumps(j2))
    else:
        if i!=0:        
             game = du.DurakGame(i)
             game_state = game.play_game()
             massmessage = json.dumps(game_state.__dict__, ensure_ascii=False)
             await socket(massmessage)
 

async def handle_client(websocket, path):
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
