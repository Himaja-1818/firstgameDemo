import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Weapon} from '../models';
import {WeaponRepository} from '../repositories';

export class WeaponController {
  constructor(
    @repository(WeaponRepository)
    public weaponRepository : WeaponRepository,
  ) {}

  @post('/weapons', {
    responses: {
      '200': {
        description: 'Weapon model instance',
        content: {'application/json': {schema: getModelSchemaRef(Weapon)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weapon, {
            title: 'NewWeapon',
            exclude: ['id'],
          }),
        },
      },
    })
    weapon: Omit<Weapon, 'id'>,
  ): Promise<Weapon> {
    return this.weaponRepository.create(weapon);
  }

  @get('/weapons/count', {
    responses: {
      '200': {
        description: 'Weapon model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Weapon) where?: Where<Weapon>,
  ): Promise<Count> {
    return this.weaponRepository.count(where);
  }

  @get('/weapons', {
    responses: {
      '200': {
        description: 'Array of Weapon model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Weapon, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Weapon) filter?: Filter<Weapon>,
  ): Promise<Weapon[]> {
    return this.weaponRepository.find(filter);
  }

  @patch('/weapons', {
    responses: {
      '200': {
        description: 'Weapon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weapon, {partial: true}),
        },
      },
    })
    weapon: Weapon,
    @param.where(Weapon) where?: Where<Weapon>,
  ): Promise<Count> {
    return this.weaponRepository.updateAll(weapon, where);
  }

  @get('/weapons/{id}', {
    responses: {
      '200': {
        description: 'Weapon model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Weapon, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Weapon, {exclude: 'where'}) filter?: FilterExcludingWhere<Weapon>
  ): Promise<Weapon> {
    return this.weaponRepository.findById(id, filter);
  }

  @patch('/weapons/{id}', {
    responses: {
      '204': {
        description: 'Weapon PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weapon, {partial: true}),
        },
      },
    })
    weapon: Weapon,
  ): Promise<void> {
    await this.weaponRepository.updateById(id, weapon);
  }

  @put('/weapons/{id}', {
    responses: {
      '204': {
        description: 'Weapon PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weapon: Weapon,
  ): Promise<void> {
    await this.weaponRepository.replaceById(id, weapon);
  }

  @del('/weapons/{id}', {
    responses: {
      '204': {
        description: 'Weapon DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weaponRepository.deleteById(id);
  }
}
