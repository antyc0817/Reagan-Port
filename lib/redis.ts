import { Redis } from "@upstash/redis";

const redisUrl = process.env.KV_REST_API_URL;
const redisToken = process.env.KV_REST_API_TOKEN;

if (!redisUrl || !redisToken) {
  throw new Error(
    "Missing Upstash Redis credentials. Set KV_REST_API_URL and KV_REST_API_TOKEN in .env.local."
  );
}

export const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export default redis;
