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
import {Armor} from '../models';
import {ArmorRepository} from '../repositories';

export class ArmorController {
  constructor(
    @repository(ArmorRepository)
    public armorRepository : ArmorRepository,
  ) {}

  @post('/armors', {
    responses: {
      '200': {
        description: 'Armor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Armor)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Armor, {
            title: 'NewArmor',
            exclude: ['id'],
          }),
        },
      },
    })
    armor: Omit<Armor, 'id'>,
  ): Promise<Armor> {
    return this.armorRepository.create(armor);
  }

  @get('/armors/count', {
    responses: {
      '200': {
        description: 'Armor model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Armor) where?: Where<Armor>,
  ): Promise<Count> {
    return this.armorRepository.count(where);
  }

  @get('/armors', {
    responses: {
      '200': {
        description: 'Array of Armor model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Armor, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Armor) filter?: Filter<Armor>,
  ): Promise<Armor[]> {
    return this.armorRepository.find(filter);
  }

  @patch('/armors', {
    responses: {
      '200': {
        description: 'Armor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Armor, {partial: true}),
        },
      },
    })
    armor: Armor,
    @param.where(Armor) where?: Where<Armor>,
  ): Promise<Count> {
    return this.armorRepository.updateAll(armor, where);
  }

  @get('/armors/{id}', {
    responses: {
      '200': {
        description: 'Armor model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Armor, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Armor, {exclude: 'where'}) filter?: FilterExcludingWhere<Armor>
  ): Promise<Armor> {
    return this.armorRepository.findById(id, filter);
  }

  @patch('/armors/{id}', {
    responses: {
      '204': {
        description: 'Armor PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Armor, {partial: true}),
        },
      },
    })
    armor: Armor,
  ): Promise<void> {
    await this.armorRepository.updateById(id, armor);
  }

  @put('/armors/{id}', {
    responses: {
      '204': {
        description: 'Armor PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() armor: Armor,
  ): Promise<void> {
    await this.armorRepository.replaceById(id, armor);
  }

  @del('/armors/{id}', {
    responses: {
      '204': {
        description: 'Armor DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.armorRepository.deleteById(id);
  }
}
