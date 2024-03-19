import { Redis } from "ioredis";
import { promisify } from "util";
import { CacheRepository } from "../../repositories/cacheRepository";

//Refactor to have one configuration file, and one repository file for RedisCache
class RedisConfig implements CacheRepository {
    private redisClient: Redis;

    constructor() {
        this.redisClient = new Redis({
            port: 6379,
            password: "1234",
        });
    }

    async get(key: string) {
        const syncRedisGet = promisify(this.redisClient.get).bind(
            this.redisClient
        );
        return await syncRedisGet(key);
    }

    async set(key: string, value: string, timelimit: number) {
        await this.redisClient.set("key", "data", "EX", 60);
        const syncRedisSet = promisify(this.redisClient.setex).bind(
            this.redisClient
        );
        return await syncRedisSet(key, timelimit, value);
    }
}

export default RedisConfig;
