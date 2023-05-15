import {PrismaClient} from '@prisma/client';
import {Repository} from '../interfaces';
import type {
  TSuppliersStatisticsInput,
  TSuppliersFinancialStatisticsOutput,
} from '../types/supplier';

export class SuppliersFinancialStatisticsRepository
  implements
    Repository<
      TSuppliersStatisticsInput,
      TSuppliersFinancialStatisticsOutput[]
    >
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

      const suppliersStatistics = await this.dbClient.$queryRawUnsafe<
        TSuppliersFinancialStatisticsOutput[]
      >(`
        select
          s.id,
          s.name,
          jsonb_agg(
            jsonb_build_object(
              'productId', p.id,
              'movementId', m.id,
              'paymentMethod', sh."paymentMethod",
              'quantity', m.quantity,
              'sellDate', sh.created_at
            )
          ) as "salesHistory",
          count(sh.id) as "totalSales",
          sum(CASE WHEN sh."paymentMethod" = 'PIX' THEN 1 ELSE 0 END) as "creditSales",
          sum(CASE WHEN sh."paymentMethod" = 'DEBIT' THEN 1 ELSE 0 END) as "pixSales",
          sum(CASE WHEN sh."paymentMethod" = 'CASH' THEN 1 ELSE 0 END) as "debitSales",
          sum(CASE WHEN sh."paymentMethod" = 'CREDIT' THEN 1 ELSE 0 END) as "cashSales"
        from "Suppliers" s
        inner join "ProductSuppliers" ps on ps."supplierId" = s.id
        inner join "Products" p on p.id = ps."productId"
        inner join "Movements" m on m."productId" = p.id
        inner join "SellHistory" sh on sh."movementId" = m.id
        where
          1 = 1
          ${suppliers?.length > 0 ? `and s.id in (${suppliers.join(',')})` : ''}
          ${userId ? `and p."userId" = '${userId}'` : ''}
          ${startDate ? `and sh.created_at >= '${startDate}'` : ''}
          ${endDate ? `and sh.created_at <= '${endDate}'` : ''}
        group by s.id, s."name"
        order by "totalSales" desc
        ${limit ? `limit ${limit}` : ''}
      `);

      return suppliersStatistics;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
