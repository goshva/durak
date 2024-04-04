import aioredis


redis = aioredis.from_url("redis://localhost", decode_responses=True)
    #print(redis)


async def redisdel(key):
    k = await redis.get(key)
    await redis.set(k,"offline")
    await redis.delete(key)
    print(f'delete{key}')
    print(f'delete{k}')
    
async def redisset(key,val):
    await redis.set(key, val)
    await redis.set(val,"online")
    print(f'set{key}')
   

async def redisget(key):
    #await redis.set("my-key", val)
    keys = await redis.get(key)
    print(keys)
    if keys:
        return keys
    else:
        return "Gamer x"    



