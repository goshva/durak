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
clients = set()

async def broadcast(message):
    if len(clients)>1:
        game = du.DurakGame(len(clients))
        game_state = game.play_game()
        massmessage = json.dumps(game_state.__dict__, ensure_ascii=False)
        await asyncio.wait([client.send(massmessage) for client in clients])
 

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
