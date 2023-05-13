import {PrismaClient} from '@prisma/client';
import {ProductsFinancialStatisticsRepository} from '../../../common/repositories/ProductsFinancialStatisticsRepository';
import {ProductsMovementsHistoryRepository} from '../../../common/repositories/ProductsMovementsHistoryRepository';
import {ProductStatisticsUseCase} from '../domain/ProductStatisticsUseCase';
import {ProductStatisticsController} from '../ports/controllers/ProductStatisticsController';

export function makeProductStatisticsController() {
  const prismaClient = new PrismaClient();
  const productFinancialStatisticsRepository =
    new ProductsFinancialStatisticsRepository(prismaClient);

  const productsMovementsHistoryRepository =
    new ProductsMovementsHistoryRepository(prismaClient);

  const productStatisticsUseCase = new ProductStatisticsUseCase(
    productFinancialStatisticsRepository,
    productsMovementsHistoryRepository,
  );

  const productStatisticsController = new ProductStatisticsController(
    productStatisticsUseCase,
  );

  return productStatisticsController;
}
