
export interface CacheRepository {
    get(key: string): Promise<any> // Needs to be refactored to return the correct type
    set(key: string, value: string, timelimit: number): Promise<any> // Needs to be refactored to return the correct
}
