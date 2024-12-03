import memoryClient from "./lruCacheConfig";
import redisClient from "./redisConfig";

interface CacheServiceType {
  set: (
    key: string,
    value: unknown,
    ttl?: number,
    useInMemory?: boolean
  ) => Promise<void>;
  get: <T = unknown>(key: string, useInMemory?: boolean) => Promise<T | null>;
  del: (key: string) => Promise<void>;
}

const CacheService: CacheServiceType = {
  set: async (key, value, ttl, useInMemory = false) => {
    try {
      const stringifiedValue = JSON.stringify(value);
      if (useInMemory) {
        memoryClient.set(key, stringifiedValue);
      }
      if (ttl) {
        await redisClient.set(key, stringifiedValue, "EX", ttl);
      } else {
        await redisClient.set(key, stringifiedValue);
      }
    } catch (err) {
      console.error("Error setting cache:", err);
    }
  },

  get: async (key, useInMemory = false) => {
    try {
      const cachedValue = memoryClient.get(key); // First fetch from in-memory
      if (cachedValue) return JSON.parse(cachedValue as string);

      const redisValue = await redisClient.get(key); // Fallback to Redis
      if (redisValue && useInMemory) {
        memoryClient.set(key, redisValue); // Cache Redis value to in-memory
      }
      return redisValue ? JSON.parse(redisValue) : null;
    } catch (err) {
      console.error("Error getting cache:", err);
      return null;
    }
  },

  del: async (key) => {
    try {
      memoryClient.delete(key); // Remove from in-memory
      await redisClient.del(key); // Remove from Redis
    } catch (err) {
      console.error("Error deleting cache:", err);
    }
  },
};

export default CacheService;
