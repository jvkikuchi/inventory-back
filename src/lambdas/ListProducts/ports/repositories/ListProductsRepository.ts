import type {Prisma, PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import type {
  TListProductsInput,
  TListProductsOutput,
} from '../../../../common/types/product';

export class ListProductsRepository
  implements Repository<TListProductsInput, TListProductsOutput>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(filterInput: TListProductsInput) {
    try {
      const {
        categories,
        suppliers,
        startDate,
        endDate,
        orderBy,
        skip,
        userId,
        pageSize,
      } = filterInput;

      const where = [
        userId && {userId},
        categories && {category: {some: {categoryId: {in: categories}}}},
        suppliers && {productSuppliers: {some: {supplierId: {in: suppliers}}}},
        startDate && {
          created_at: {gte: new Date(`${startDate}T00:00:00.000Z`)},
        },
        endDate && {created_at: {lte: new Date(`${endDate}T23:59:59.999Z`)}},
      ];

      console.log('Where clauses', where);

      const [products, count] = await Promise.all([
        this.dbClient.products.findMany({
          skip,
          orderBy: {name: (orderBy as Prisma.SortOrder) || 'asc'},
          take: pageSize,
          where: {AND: where},
        }),

        this.dbClient.products.count({
          where: {AND: where},
        }),
      ]);

      return {products, count, totalPages: Math.ceil(count / pageSize)};
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
