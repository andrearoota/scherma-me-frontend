export enum CategoryEnum {
  under14 = 'under14',
  cadetti = 'cadetti',
  giovani = 'giovani',
  under23 = 'under23',
  assoluti = 'assoluti',
  master0 = 'master0',
  master1 = 'master1',
  master2 = 'master2',
  master3 = 'master3',
  master4 = 'master4',
}

export type Category = keyof typeof CategoryEnum;
