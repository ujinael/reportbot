import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CallTouchRequestClient } from './request_client.entity';
import { CallTouchRequestSession } from './request_session.entity';

@Entity('calltouch_request')
export class CallTouchRequest {
  @PrimaryGeneratedColumn('uuid')
  id: EntityID;
  @Column()
  date: Date;
  @Column({ nullable: true })
  requestType?: string;
  @Column()
  dateStr: string;
  @Column({ nullable: true })
  manager?: string;
  @OneToOne(() => CallTouchRequestSession, (session) => session.request, {
    cascade: true,
  })
  @JoinColumn()
  session: CallTouchRequestSession;
  @Column()
  subject: string;
  @Column()
  uniqTargetRequest: boolean;
  @Column({ nullable: true })
  uniqueRequest?: boolean;
  @Column({ nullable: true })
  yandexDirect?: string;
  @Column({ nullable: true })
  googleAdWords?: string;
  @Column()
  requestNumber: string;
  @Column()
  requestId: number;

  @OneToOne(() => CallTouchRequestClient, (client) => client.request, {
    cascade: true,
  })
  @JoinColumn()
  client: CallTouchRequestClient;
  @Column()
  siteId: number;
  @Column()
  targetRequest: boolean;
  @Column()
  status: string;
  @Column()
  requestUrl: string;
  @Column({ type: 'bigint' })
  ctClientId: number;
  @Column({ nullable: true })
  dcm?: string;
  @Column({ nullable: true })
  ctGlobalId?: string;
}
