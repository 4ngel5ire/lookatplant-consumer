import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';
import {
  SUBSCRIBER_FIXED_FN_REF_MAP,
  SUBSCRIBER_OBJ_REF_MAP,
} from './kafka.decorator';
import { KafkaConfig, KafkaPayload } from './kafka.message';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private fixedConsumer: Consumer;

  constructor(private kafkaConfig: KafkaConfig) {
    this.kafka = new Kafka({
      brokers: this.kafkaConfig.brokers,
      sasl: {
        mechanism: 'scram-sha-256',
        username: this.kafkaConfig.user,
        password: this.kafkaConfig.pass,
      },
      ssl: true,
    });
    this.producer = this.kafka.producer();
    this.fixedConsumer = this.kafka.consumer({
      groupId: this.kafkaConfig.groupId,
    });
  }

  async onModuleInit(): Promise<void> {
    await this.connect();

    SUBSCRIBER_FIXED_FN_REF_MAP.forEach((functionRef, topic) => {
      // attach the function with kafka topic name
      this.bindAllTopicToFixedConsumer(functionRef, topic);
    });

    await this.fixedConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const functionRef = SUBSCRIBER_FIXED_FN_REF_MAP.get(topic);
        const object = SUBSCRIBER_OBJ_REF_MAP.get(topic);
        // bind the subscribed functions to topic
        await functionRef.apply(object, [message.value.toString()]);
      },
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.disconnect();
  }

  async connect() {
    await this.producer.connect();
    await this.fixedConsumer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
    await this.fixedConsumer.disconnect();
  }

  async bindAllTopicToFixedConsumer(callback, _topic) {
    await this.fixedConsumer.subscribe({ topic: _topic, fromBeginning: false });
  }

  async sendMessage(kafkaMessage: KafkaPayload) {
    await this.producer.connect();
    const metadata = await this.producer
      .send({
        topic: this.kafkaConfig.topic,
        messages: [{ value: JSON.stringify(kafkaMessage) }],
      })
      .catch((e) => console.error(e.message, e));
    await this.producer.disconnect();
    return metadata;
  }
}
