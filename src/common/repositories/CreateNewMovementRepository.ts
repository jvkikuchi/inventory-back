import type {PrismaClient} from '@prisma/client';
import {Repository} from '../interfaces';
import {Movements, MovementsInput} from '../types/movements';

export class CreateNewMovementRepository
  implements Repository<MovementsInput, Movements>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(movementDTO: MovementsInput) {
    const movement = await this.dbClient.movements.create({data: movementDTO});

    return movement;
  }
}
