import {UseCase} from '../../../common/interfaces';
import {SuppliersFinancialStatisticsRepository} from '../../../common/repositories/SupplierFinancialStatistics';
import {
  TSuppliersFinancialStatisticsInput,
  TSuppliersFinancialStatisticsOutput,
} from '../../../common/types/supplier';

export class SuppliersFinancialStatisticsUseCase
  implements
    UseCase<
      TSuppliersFinancialStatisticsInput,
      TSuppliersFinancialStatisticsOutput
    >
{
  constructor(
    private readonly SuppliersFinancialStatisticsRepository: SuppliersFinancialStatisticsRepository,
  ) {}

  async exec(suppliersStatisticsInput: TSuppliersFinancialStatisticsInput) {
    try {
      const {userId, suppliers} = suppliersStatisticsInput;

      const suppliersStatisticsDTO = {
        userId,
        suppliers,
      };

      console.log('Filters from request', {suppliersStatisticsDTO});

      const [suppliersStatistics] =
        await this.SuppliersFinancialStatisticsRepository.exec(
          suppliersStatisticsInput,
        );
      console.log('suppliersStatistics');
      return suppliersStatistics;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
