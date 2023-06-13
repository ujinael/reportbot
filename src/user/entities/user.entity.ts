import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  ASSISTENT = 'assistent',
  REGISTRATOR = 'registrator',
  MANAGER = 'manager',
  CLIENT = 'client',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'employer_id', type: 'uuid', nullable: true })
  employerId?: string;
  @Column({ name: 'telegram_id' })
  telegramId: number;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name', default: '' })
  lastName: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;
}
