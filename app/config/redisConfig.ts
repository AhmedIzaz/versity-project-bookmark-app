import { Redis } from "ioredis";
const { REDIS_HOST, REDIS_PORT } = process.env;

let redisClient = new Redis({
  host: REDIS_HOST || "localhost",
  port: +(REDIS_PORT || 6379),
  password: "your-strong-password",
});

export default redisClient;
