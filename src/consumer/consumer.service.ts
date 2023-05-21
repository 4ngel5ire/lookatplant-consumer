import { Injectable } from '@nestjs/common';
import { SubscribeTo } from 'src/kafka/kafka.decorator';
import { KafkaPayload } from 'src/kafka/kafka.message';

@Injectable()
export class ConsumerService {
  /**
   * Connect consumer to group_id.
   * @param payload
   */
  @SubscribeTo(process.env.KAFKA_TOPIC)
  helloSubscriber(payload: KafkaPayload) {
    console.log('[KAKFA-CONSUMER] Print message after receiving', payload);
  }
}
