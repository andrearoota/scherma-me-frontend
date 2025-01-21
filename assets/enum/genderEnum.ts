export enum GenderEnum {
  femminile = 'femminile',
  maschile = 'maschile',
}

export type Gender = keyof typeof GenderEnum;
