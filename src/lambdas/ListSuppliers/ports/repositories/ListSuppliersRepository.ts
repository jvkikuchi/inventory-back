import type {Prisma, PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import type {
  TListSuppliersInput,
  TListSuppliersOutput,
} from '../../../../common/types/supplier';

export class ListSuppliersRepository
  implements Repository<TListSuppliersInput, TListSuppliersOutput>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(filterInput: TListSuppliersInput) {
    try {
      const {products, startDate, endDate, orderBy, skip, pageSize} =
        filterInput;

      const where = [
        products && {productSuppliers: {some: {productId: {in: products}}}},
        startDate && {
          created_at: {gte: new Date(`${startDate}T00:00:00.000Z`)},
        },
        endDate && {created_at: {lte: new Date(`${endDate}T23:59:59.999Z`)}},
      ];

      console.log('Where clauses', where);

      const [suppliers, count] = await Promise.all([
        this.dbClient.suppliers.findMany({
          skip,
          orderBy: {name: (orderBy as Prisma.SortOrder) || 'asc'},
          take: pageSize,
          where: {AND: where},
        }),

        this.dbClient.suppliers.count({
          where: {AND: where},
        }),
      ]);

      return {suppliers, count, totalPages: Math.ceil(count / pageSize)};
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
