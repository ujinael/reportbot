export interface ICallTouchClientDto {
  clientId: number;
  fio: string;
  phones: [
    {
      phoneNumber: string;
      phoneType: string;
    },
  ];
  contacts: Array<any>;
}
