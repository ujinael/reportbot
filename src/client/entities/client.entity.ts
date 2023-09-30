import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column()
  patronimyc: string;

  @Column({ name: 'umc_id' })
  umcId: string;

  get fullTitle() {
    return `${this.name} ${this.surname} ${this.patronimyc}`;
  }
}
