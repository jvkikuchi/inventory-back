import {UseCase} from '../../../common/interfaces';
import {SuppliersFinancialStatisticsRepository} from '../../../common/repositories/SupplierFinancialStatisticsRepository';
import {SupplierMovementsHistoryRepository} from '../../../common/repositories/SupplierMovementsHistoryRepository';
import {
  TSuppliersStatisticsInput,
  TSuppliersStatisticsOutput,
} from '../../../common/types/supplier';

export class SuppliersStatisticsUseCase
  implements UseCase<TSuppliersStatisticsInput, TSuppliersStatisticsOutput>
{
  constructor(
    private readonly SuppliersFinancialStatisticsRepository: SuppliersFinancialStatisticsRepository,
    private readonly SupplierMovementsHistoryRepository: SupplierMovementsHistoryRepository,
  ) {}

  async exec(suppliersStatisticsInput: TSuppliersStatisticsInput) {
    try {
      const {userId, suppliers} = suppliersStatisticsInput;

      const suppliersStatisticsDTO = {
        userId,
        suppliers,
      };

      console.log('Filters from request', {suppliersStatisticsDTO});

      const [[suppliersFinancialStatistics], [supplierMovementsHistory]] =
        await Promise.all([
          this.SuppliersFinancialStatisticsRepository.exec(
            suppliersStatisticsInput,
          ),
          this.SupplierMovementsHistoryRepository.exec(suppliersStatisticsDTO),
        ]);

      const id = suppliersFinancialStatistics.id;
      const name = suppliersFinancialStatistics.name;

      // delete repeat infos
      delete supplierMovementsHistory.id;
      delete supplierMovementsHistory.name;

      delete suppliersFinancialStatistics.id;
      delete suppliersFinancialStatistics.name;

      return {
        name,
        id,
        ...suppliersFinancialStatistics,
        ...supplierMovementsHistory,
      };
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
