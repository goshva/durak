import json
async def socket_messj(message):
      data=json.loads(message)
      print(data.get("type"))
      return data.get("type")
