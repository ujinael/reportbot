import { CallTouchPhoneCall } from '@/calltouch/calls/entities/phonecall.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CallTouchRequest } from './request.entity';
@Entity('calltouch_request_session')
export class CallTouchRequestSession {
  @PrimaryGeneratedColumn('uuid')
  id: EntityID;
  @Column({ nullable: true })
  sessionId?: number;
  @Column({ nullable: true })
  keywords?: string;
  @Column()
  city: string;
  @Column()
  ip: string;
  @Column()
  source: string;
  @Column()
  medium: string;
  @Column()
  ref: string;
  @Column()
  url: string;
  @Column()
  utmSource: string;
  @Column({ nullable: true })
  utmMedium?: string;
  @Column({ nullable: true })
  utmTerm?: string;
  @Column({ nullable: true })
  utmContent?: string;
  @Column({ nullable: true })
  utmCampaign?: string;
  @Column({ nullable: true })
  guaClientId?: string;
  @Column()
  sessionDate: string;
  @Column({ type: 'simple-array', nullable: true })
  attrs?: Array<string>;
  @Column()
  attribution: number;
  @Column({ nullable: true })
  yaClientId?: string;
  @Column({ nullable: true })
  ctGlobalId?: string;
  @Column()
  browser: string;
  @OneToOne(() => CallTouchRequest, { nullable: true })
  request?: CallTouchRequest;
  @OneToOne(() => CallTouchPhoneCall, { nullable: true })
  phoneCall?: CallTouchPhoneCall;
}
