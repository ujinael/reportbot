import { Expose } from 'class-transformer';

export class Client {
  id: string;
  @Expose({ name: 'first_name' })
  firstName: string;
  @Expose({ name: 'last_name' })
  lastName: string;
  patronimyc: string;

  get fullTitle(){
    return `${this.lastName} ${this.firstName} ${this.patronimyc}`
  }
}
