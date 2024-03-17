import aioredis






redis = aioredis.from_url("redis://localhost")
    #print(redis)


async def redisdel(key):
    await redis.delete(key)
    print(f'delete{key}')
    
async def redisset(key,val):
    await redis.set(key, val)
    #print(f'set{key}')
   

async def redisget(key):
    #await redis.set("my-key", val)
    keys = await redis.get(key)
    print(keys)    



