import { Injectable } from '@nestjs/common';
import { KafkaPayload } from 'src/kafka/kafka.message';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class DefaultService {
  constructor(private readonly kafkaService: KafkaService) {}
  async send(message: any) {
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: message,
      messageType: 'Say.Hello',
      topicName: process.env.KAFKA_TOPIC,
    };
    const value = await this.kafkaService.sendMessage(payload);
    console.log('DEFAULT SERVICE: kafka SEND response: ', value);
    return message;
  }
}
