import {UseCase} from '../../../common/interfaces';
import {ProductsFinancialStatisticsRepository} from '../../../common/repositories/ProductsFinancialStatisticsRepository';
import {SuppliersFinancialStatisticsRepository} from '../../../common/repositories/SupplierFinancialStatisticsRepository';
import {
  TStatisticsInput,
  TStatisticsOutput,
} from '../../../common/types/statistics';

export class GetStatisticsUseCase
  implements UseCase<TStatisticsInput, TStatisticsOutput>
{
  constructor(
    private readonly productFinancialStatisticsRepository: ProductsFinancialStatisticsRepository,
    private readonly suppliersFinancialStatisticsRepository: SuppliersFinancialStatisticsRepository,
  ) {}

  async exec(getStatisticsInput: TStatisticsInput) {
    try {
      console.log('Filters from request', getStatisticsInput);

      const {products, limit, userId, endDate, startDate, suppliers} =
        getStatisticsInput;

      const productsFilterInput = {
        limit,
        products,
        userId,
        endDate,
        startDate,
      };

      const suppliersFilterInput = {
        limit,
        suppliers,
        userId,
        endDate,
        startDate,
      };

      const [productsFinancialStatistics, suppliersFinancialStatistics] =
        await Promise.all([
          this.productFinancialStatisticsRepository.exec(productsFilterInput),
          this.suppliersFinancialStatisticsRepository.exec(
            suppliersFilterInput,
          ),
        ]);

      return {
        productsFinancialStatistics,
        suppliersFinancialStatistics,
      };
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
