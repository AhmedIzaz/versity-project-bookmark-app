// in LRU , the default envict exist, means the priority of least recently used key will be priority of most recently used key will be prioritized
// if we use Map, then we have to manually configure those things.
import { LRUCache } from "lru-cache";
const inMemoryCache = new LRUCache({
  max: 500, // max 500 key will be cached in memory
  ttl: 5 * 60 * 1000, //// how long a key will live in memory  // now added for 5 minute
  allowStale: false, // return stale items before removing from cache?
  ttlAutopurge: true, // Automatically removes expired items
  updateAgeOnGet: true, // during key value get, again set the new time of TTL in that key to live
  updateAgeOnHas: true, // during key value is exist check, again set the new time of TTL in that key to live
  // configure other properties according to documentation properties
});

export default inMemoryCache;
