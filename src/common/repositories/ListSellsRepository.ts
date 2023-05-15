import type {PrismaClient, SellHistory} from '@prisma/client';
import {Repository} from '../interfaces';
import {TListSalesInput} from '../types/sellHistory';

export class ListSellsRepository
  implements Repository<TListSalesInput, SellHistory[]>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(filterMovement: TListSalesInput) {
    const {startDate, endDate, productId, userId} = filterMovement;

    const where = [
      startDate && {
        created_at: {gte: new Date(`${startDate}T00:00:00.000Z`)},
      },
      endDate && {created_at: {lte: new Date(`${endDate}T23:59:59.999Z`)}},
    ];

    const sells = await this.dbClient.sellHistory.findMany({
      where: {
        movement: {
          userId,
          ...(productId && {productId: Number(productId)}),
        },
        AND: where,
      },
    });

    return sells;
  }
}
