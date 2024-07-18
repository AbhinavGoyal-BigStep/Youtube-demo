import { RedisClientType, createClient } from 'redis';

export class Redis {
  private redisClient: RedisClientType;
  constructor() {
    this.redisClient = createClient();
    this.redisClient.on('error', err => console.log('Redis Client Error', err));
    this.connect();
  }

  async connect() {
    await this.redisClient.connect();
  }

  async setValue(key: string, value: string) {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string) {
    return await this.redisClient.get(key);
  }

  async setJSON(key: string, obj) {
    await this.redisClient.set(key, JSON.stringify(obj));
  }

  async getJSON(key: string) {
    const jsonString = await this.redisClient.get(key);
    return jsonString ? JSON.parse(jsonString) : null;
  }

  async quit() {
    await this.redisClient.flushAll();
    await this.redisClient.quit();
  }
}
