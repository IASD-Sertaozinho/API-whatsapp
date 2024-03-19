export interface CacheRepository {
    get(key: string): Promise<string | null | undefined>;
    set(
        key: string,
        value: string,
        timelimit: number
    ): Promise<string | undefined>;
}
