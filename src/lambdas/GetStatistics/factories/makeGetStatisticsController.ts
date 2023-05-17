import {PrismaClient} from '@prisma/client';
import {ProductsFinancialStatisticsRepository} from '../../../common/repositories/ProductsFinancialStatisticsRepository';
import {GetStatisticsUseCase} from '../domain/StatisticsUseCase';
import {GetStatisticsController} from '../ports/controllers/ProductStatisticsController';
import {SuppliersFinancialStatisticsRepository} from '../../../common/repositories/SupplierFinancialStatisticsRepository';

export function makeGetStatisticsController() {
  const prismaClient = new PrismaClient();

  const productFinancialStatisticsRepository =
    new ProductsFinancialStatisticsRepository(prismaClient);

  const suppliersFinancialStatisticsRepository =
    new SuppliersFinancialStatisticsRepository(prismaClient);

  const getStatisticsUseCase = new GetStatisticsUseCase(
    productFinancialStatisticsRepository,
    suppliersFinancialStatisticsRepository,
  );

  const getStatisticsController = new GetStatisticsController(
    getStatisticsUseCase,
  );

  return getStatisticsController;
}
