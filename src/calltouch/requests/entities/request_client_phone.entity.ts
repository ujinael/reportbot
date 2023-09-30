import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CallTouchRequestClient } from './request_client.entity';

@Entity('request_client_phone')
export class RequestClientPhone {
  @PrimaryGeneratedColumn('uuid')
  id: EntityID;
  @Column()
  phoneNumber: string;
  @Column()
  phoneType: string;
  @ManyToOne(() => CallTouchRequestClient)
  client: CallTouchRequestClient;
}
