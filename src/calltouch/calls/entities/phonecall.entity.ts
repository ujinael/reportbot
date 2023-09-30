import { CallTouchRequestSession } from 'src/calltouch/requests/entities/request_session.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('phone_call')
export class CallTouchPhoneCall {
  @PrimaryGeneratedColumn('uuid')
  id: EntityID;
  @OneToOne(() => CallTouchRequestSession, (session) => session.phoneCall)
  session: CallTouchRequestSession;
  @Column()
  callId: string;
  @Column()
  callphase: string;
  @Column()
  attribution: number;
  @Column({ type: 'simple-array' })
  callTags: Array<string>;
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
  @Column()
  manager: string;
  @Column()
  successful: string;
  @Column()
  uniqueCall: boolean;
  @Column()
  targetCall: boolean;
  @Column()
  uniqTargetCall: boolean;
  @Column()
  callbackCall: boolean;

  @Column()
  callUrl: string;

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
  @Column({ type: 'simple-array', nullable: true })
  mapVisits?: Array<string>;

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
  yandexDirect: boolean;
  @Column()
  googleAdWords: boolean;
  @Column()
  siteId: number;
  @Column()
  siteName: string;
  @Column()
  callbackInfo: string;
  @Column()
  ctClientId: number;
  @Column()
  dcm: string;
  @Column()
  phonesInText: string;
  @Column({ nullable: true })
  ctGlobalId?: string;
  @Column({ nullable: true })
  subPoolName?: string;
  @Column()
  statusDetails: string;
}
