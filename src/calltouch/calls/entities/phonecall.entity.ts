import { CallTouchRequestSession } from '@/calltouch/requests/entities/request_session.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('calltouch_phone_call')
export class CallTouchPhoneCall {
  @PrimaryGeneratedColumn('uuid')
  id: EntityID;
  @OneToOne(() => CallTouchRequestSession, (session) => session.phoneCall, {
    cascade: true,
  })
  @JoinColumn({ name: 'session_id' })
  session: CallTouchRequestSession;
  @Column()
  callId: string;
  @Column()
  callphase: string;
  @Column()
  date: Date;
  @Column()
  duration: number;
  @Column()
  callerNumber: string;
  @Column()
  redirectNumber: string;
  @Column()
  phoneNumber: string;
  @Column({ nullable: true })
  manager?: string;
  @Column()
  successful: boolean;
  @Column()
  uniqueCall: boolean;
  @Column()
  targetCall: boolean;
  @Column()
  uniqTargetCall: boolean;
  @Column()
  callbackCall: boolean;

  @Column({ nullable: true })
  callUrl?: string;

  @Column()
  hostname: string;

  @Column()
  ctCallerId: string;
  @Column({ nullable: true })
  clientId?: number;

  @Column()
  sipCallId: string;
  @Column()
  userAgent: string;

  @Column()
  waitingConnect: number;
  @Column()
  callReferenceId: string;

  @Column({ nullable: true })
  callClientUniqueId?: number;
  @Column()
  device: string;
  @Column()
  os: string;

  @Column()
  timestamp: number;
  @Column()
  sessionDate: string;
  @Column()
  siteId: number;
  @Column()
  siteName: string;
  @Column({ nullable: true })
  callbackInfo?: string;
  @Column({ type: 'bigint' })
  ctClientId: number;
  @Column({ nullable: true })
  dcm: string;
  @Column({ nullable: true })
  phonesInText?: string;
  @Column({ nullable: true })
  ctGlobalId?: string;
  @Column({ nullable: true })
  subPoolName?: string;
  @Column()
  statusDetails: string;
}
