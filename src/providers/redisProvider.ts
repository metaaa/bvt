import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from './dto/redisConfig';

class RedisProvider {
  /**
   * Redis client instance
   * @private
   */
  private client: RedisClient;

  /**
   * whether we have an active connection
   * @private
   */
  private connected: boolean = false;

  constructor() {
    // initialize singleton client
    if (!this.connected) {
      this.client = new Redis(cacheConfig.config.redis);
      this.connected = true;
    }
  }

  /**
   * Save key-value
   *
   * @param key
   * @param value
   */
  async setItem(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  /**
   * Get redis stored value by key
   *
   * @param key
   */
  async getItem<T>(key: string): Promise<string | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as string;
  }

  /**
   * Remove redis stored item by key
   *
   * @param key
   */
  async removeItem(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default new RedisProvider();
