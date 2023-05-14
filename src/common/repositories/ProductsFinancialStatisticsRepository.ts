import {PrismaClient} from '@prisma/client';
import {Repository} from '../interfaces';
import type {
  TProductStatisticsInput,
  TProductsFinancialStatisticsOutput,
} from '../types/product';

export class ProductsFinancialStatisticsRepository
  implements
    Repository<TProductStatisticsInput, TProductsFinancialStatisticsOutput[]>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(filterInput: TProductStatisticsInput) {
    try {
      const {limit, products, userId, startDate, endDate} = filterInput;

      console.log('Get products statistics', {
        limit,
        products,
        userId,
        startDate,
        endDate,
      });

      const productFinancialStatistics = await this.dbClient.$queryRawUnsafe<
        TProductsFinancialStatisticsOutput[]
      >(`
        select 
          p."name",
          p.id,
          s."name" as "supplierName",
          jsonb_agg(
            jsonb_build_object(
              'movementId', m.id,
              'movementType', m."movementType",
              'quantity', m.quantity,
              'paymentMethod', sh."paymentMethod",
              'sellDate', sh.created_at
            ) 
          ) as "salesHistory",
          count(sh.id) as "totalSales",
          sum(CASE WHEN sh."paymentMethod" = 'PIX' THEN 1 ELSE 0 END) as "creditSales",
          sum(CASE WHEN sh."paymentMethod" = 'DEBIT' THEN 1 ELSE 0 END) as "pixSales",
          sum(CASE WHEN sh."paymentMethod" = 'CASH' THEN 1 ELSE 0 END) as "debitSales",
          sum(CASE WHEN sh."paymentMethod" = 'CREDIT' THEN 1 ELSE 0 END) as "cashSales"
        from "Products" p 
        inner join "Movements" m on m."productId" = p.id 
        inner join "SellHistory" sh on sh."movementId" = m.id 
        inner join "ProductSuppliers" ps on ps."productId" = p.id 
        inner join "Suppliers" s on s.id = ps."supplierId" 
        where
          1 = 1
          ${products?.length > 0 ? `and s.id in (${products.join(',')})` : ''}
          ${userId ? `and p."userId" = '${userId}'` : ''}
          ${startDate ? `and sh.created_at >= '${startDate}'` : ''}
          ${endDate ? `and sh.created_at <= '${endDate}'` : ''}
          group  by p."name" , p.id, s."name" 
        order by "totalSales" desc
        ${limit ? `limit ${limit}` : ''}
      `);

      return productFinancialStatistics;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
