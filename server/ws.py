import durak_class as du
import json
import pathlib
import ssl
import asyncio
import websockets
import json
from dotenv import load_dotenv
import os
load_dotenv()
PORT = os.getenv('PORT')
URL = os.getenv('URL')
print(URL)

j11=open("../2.json", "r")
j1=j11.read()
j11.close()

j22=open("../3.json", "r")
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
    async with websockets.serve(handle_client, URL, PORT): #, ssl=ssl_context):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())
