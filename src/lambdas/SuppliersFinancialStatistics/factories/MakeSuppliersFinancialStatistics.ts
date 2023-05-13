import {PrismaClient} from '@prisma/client';
import {SuppliersFinancialStatisticsUseCase} from '../domain/SuppliersFinancialStatisticsUseCase';
import {SuppliersFinancialStatisticsController} from '../ports/controllers/SuppliersFinancialStatisticsController';
import {SuppliersFinancialStatisticsRepository} from '../../../common/repositories/SupplierFinancialStatistics';

export function MakeSuppliersFinancialStatistics() {
  const prismaClient = new PrismaClient();

  const suppliersFinancialStatisticsRepository =
    new SuppliersFinancialStatisticsRepository(prismaClient);

  const suppliersFinancialStatisticsUseCase =
    new SuppliersFinancialStatisticsUseCase(
      suppliersFinancialStatisticsRepository,
    );

  const suppliersFinancialStatisticsController =
    new SuppliersFinancialStatisticsController(
      suppliersFinancialStatisticsUseCase,
    );

  return suppliersFinancialStatisticsController;
}
