import {PrismaClient} from '@prisma/client';
import {Repository} from '../interfaces';
import type {
  TProductStatisticsInput,
  TProductsMovementsHistoryOutput,
} from '../types/product';

export class ProductsMovementsHistoryRepository
  implements
    Repository<TProductStatisticsInput, TProductsMovementsHistoryOutput[]>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(filterInput: TProductStatisticsInput) {
    try {
      const {limit, products, userId, startDate, endDate} = filterInput;

      console.log('Get products movements', {
        limit,
        products,
        userId,
        startDate,
        endDate,
      });

      const suppliersMovements = await this.dbClient.$queryRawUnsafe<
        TProductsMovementsHistoryOutput[]
      >(`
        select 
          s.id,
          s."name",
          jsonb_agg(
            jsonb_build_object(
              'movementId', m.id,
              'movementType', m."movementType",
              'quantity', m.quantity,
              'date', m.created_at  
            ) 
          ) as "movementsHistory"
        FROM "Suppliers" s 
        INNER JOIN "ProductSuppliers" ps ON ps."supplierId" = s.id 
        INNER JOIN "Products" p ON p.id = ps."productId" 
        INNER JOIN "Movements" m ON m."productId" = p.id 
        where
          1 = 1
          ${products?.length > 0 ? `and s.id in (${products.join(',')})` : ''}
          ${userId ? `and p."userId" = '${userId}'` : ''}
          ${startDate ? `and m.created_at >= '${startDate}'` : ''}
          ${endDate ? `and m.created_at <= '${endDate}'` : ''}
        group by s.id, s."name"
        ${limit ? `limit ${limit}` : ''}
      `);

      return suppliersMovements;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
