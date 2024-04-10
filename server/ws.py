import durak_class as du
import json
import pathlib
import ssl
import asyncio
import websockets
import json
import ssl
from dotenv import load_dotenv
import os
load_dotenv()
PORT = os.getenv('PORT')
URL = os.getenv('URL')
#ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#ssl_certificate    = "/home/goshva/.acme.sh/*.vit.ooo_ecc/*.vit.ooo.cer"
#ssl_certificate_key ="/home/goshva/.acme.sh/*.vit.ooo_ecc/*.vit.ooo.key"
#ssl_context.load_cert_chain(ssl_certificate, keyfile=ssl_certificate_key)
clients = set()

async def socket(message):
    for client in clients:
            await client.send(message)

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
 #   async with websockets.serve(handle_client, URL, PORT, ssl=ssl_context):
    async with websockets.serve(handle_client, URL, PORT):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())
