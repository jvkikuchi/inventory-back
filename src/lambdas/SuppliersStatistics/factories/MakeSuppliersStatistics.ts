import {PrismaClient} from '@prisma/client';
import {SuppliersStatisticsUseCase} from '../domain/SuppliersStatisticsUseCase';
import {SuppliersStatisticsController} from '../ports/controllers/SuppliersStatisticsController';
import {SuppliersFinancialStatisticsRepository} from '../../../common/repositories/SupplierFinancialStatisticsRepository';
import {SupplierMovementsHistoryRepository} from '../../../common/repositories/SupplierMovementsHistoryRepository';

export function MakeSuppliersStatistics() {
  const prismaClient = new PrismaClient();

  const suppliersFinancialStatisticsRepository =
    new SuppliersFinancialStatisticsRepository(prismaClient);

  const supplierMovementsHistoryRepository =
    new SupplierMovementsHistoryRepository(prismaClient);

  const suppliersStatisticsUseCase = new SuppliersStatisticsUseCase(
    suppliersFinancialStatisticsRepository,
    supplierMovementsHistoryRepository,
  );

  const suppliersStatisticsController = new SuppliersStatisticsController(
    suppliersStatisticsUseCase,
  );

  return suppliersStatisticsController;
}
