import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { KafkaConfig } from 'src/kafka/kafka.message';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'cockroachdb',

      host: this.getValue('PG_HOST'),
      port: parseInt(this.getValue('PG_PORT')),
      username: this.getValue('PG_USER'),
      password: this.getValue('PG_PASSWORD'),
      database: this.getValue('PG_DATABASE'),
      entities: [__dirname + '/../*/*/*-entity.{ts,js}'],
      ssl: true,
    };
  }

  public getKafkaConfig(): KafkaConfig {
    return {
      brokers: [this.getValue('KAFKA_BROKERS')],
      groupId: this.getValue('KAFKA_GROUPID'),
      pass: this.getValue('KAFKA_PASSWORD'),
      user: this.getValue('KAFKA_USER'),
      topic: this.getValue('KAFKA_TOPIC'),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'PG_HOST',
  'PG_PORT',
  'PG_USER',
  'PG_PASSWORD',
  'PG_DATABASE',

  'KAFKA_BROKERS',
  'KAFKA_GROUPID',
  'KAFKA_PASSWORD',
  'KAFKA_USER',
]);

export { configService };
