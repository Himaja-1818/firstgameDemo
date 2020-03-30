import {Entity, model, property} from '@loopback/repository';

@model()
export class Weapon extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  attack?: number;

  @property({
    type: 'number',
  })
  defence?: number;


  constructor(data?: Partial<Weapon>) {
    super(data);
  }
}

export interface WeaponRelations {
  // describe navigational properties here
}

export type WeaponWithRelations = Weapon & WeaponRelations;
