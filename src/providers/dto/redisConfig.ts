import { RedisOptions } from 'ioredis';

interface IRedisConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT || 6666,
    },
  },
  driver: 'redis',
} as IRedisConfig;
