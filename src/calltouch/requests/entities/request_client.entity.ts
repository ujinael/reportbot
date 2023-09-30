import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CallTouchRequest } from './request.entity';
import { RequestClientPhone } from './request_client_phone.entity';

@Entity('calltouch_request_client')
export class CallTouchRequestClient {
  @PrimaryGeneratedColumn('uuid')
  id: EntityID;
  @Column()
  clientId: number;
  @Column()
  fio: string;
  @OneToOne(() => CallTouchRequest)
  request: CallTouchRequest;
  @OneToMany(() => RequestClientPhone, (phone) => phone.client, {
    cascade: true,
  })
  phones: RequestClientPhone[];
}
