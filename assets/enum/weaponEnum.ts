export enum WeaponEnum {
  fioretto = 'fioretto',
  sciabola = 'sciabola',
  spada = 'spada',
}

export type Weapon = keyof typeof WeaponEnum;
