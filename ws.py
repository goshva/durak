import durak_class as du
import json

import asyncio
import websockets
import json

clients = set()

async def broadcast(message):
    if len(clients)>1:
        game = du.DurakGame(len(clients))
        game_state = game.play_game()
        massmessage = json.dumps(game_state.__dict__)
        await asyncio.wait([client.send(massmessage) for client in clients])
 

async def handle_client(websocket, path):
    clients.add(websocket)
    try:
        async for message in websocket:
            await broadcast(message)
    finally:
        clients.remove(websocket)

async def start_server():
    async with websockets.serve(handle_client, "localhost", 8765):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())
