import { Redis } from "ioredis";
import { promisify } from "util";

const redisClient = new Redis({
    port: 6379,
    password: "1234"
});


function getRedis(key: string) {
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(key);
}

function setRedis(key: string, value: string, timelimit: number) {
    redisClient.set("key", "data", "EX", 60);
    const syncRedisSet = promisify(redisClient.setex).bind(redisClient);
    return syncRedisSet(key, timelimit, value);
}

export { redisClient, getRedis, setRedis }
