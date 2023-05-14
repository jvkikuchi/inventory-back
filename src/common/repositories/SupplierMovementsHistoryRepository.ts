import {PrismaClient} from '@prisma/client';
import {Repository} from '../interfaces';
import type {
  TSuppliersStatisticsInput,
  TSuppliersMovementsHistoryOutput,
} from '../types/supplier';

export class SupplierMovementsHistoryRepository
  implements
    Repository<TSuppliersStatisticsInput, TSuppliersMovementsHistoryOutput[]>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(filterInput: TSuppliersStatisticsInput) {
    try {
      const {limit, suppliers, userId, startDate, endDate} = filterInput;

      console.log('Get suppliers statistics', {
        limit,
        suppliers,
        userId,
        startDate,
        endDate,
      });

      const suppliersMovements = await this.dbClient.$queryRawUnsafe<
        TSuppliersMovementsHistoryOutput[]
      >(`
        select 
          s.id,
          s."name",
          jsonb_agg(
            jsonb_build_object(
              'productId', p.id,
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
          ${suppliers?.length > 0 ? `and s.id in (${suppliers.join(',')})` : ''}
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
