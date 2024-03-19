import { CacheRepository } from "../cacheRepository";

export default class InMemoryCacheRepository implements CacheRepository {
    private memory: Map<string, { value: string; expiration: number }> =
        new Map();

    constructor() {
        this.memory = new Map();
    }

    async get(key: string): Promise<string | null | undefined> {
        const entry = this.memory.get(key);
        if (entry) {
            // Check if the entry has expired
            if (entry.expiration < Date.now()) {
                // Remove the expired entry from the cache
                this.memory.delete(key);
                return null;
            }
            return entry.value;
        }
        return null;
    }

    async set(
        key: string,
        value: string,
        timelimit: number
    ): Promise<string | undefined> {
        const expiration = Date.now() + timelimit; // Calculate expiration time
        this.memory.set(key, { value, expiration });
        return value;
    }
}
