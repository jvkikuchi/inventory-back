import {UseCase} from '../../../common/interfaces';
import {ProductsFinancialStatisticsRepository} from '../../../common/repositories/ProductsFinancialStatisticsRepository';
import {ProductsMovementsHistoryRepository} from '../../../common/repositories/ProductsMovementsHistoryRepository';
import {
  TProductStatisticsInput,
  TProductStatisticsOutput,
} from '../../../common/types/product';

export class ProductStatisticsUseCase
  implements UseCase<TProductStatisticsInput, TProductStatisticsOutput>
{
  constructor(
    private readonly productFinancialStatisticsRepository: ProductsFinancialStatisticsRepository,
    private readonly productsMovementsHistoryRepository: ProductsMovementsHistoryRepository,
  ) {}

  async exec(productStatisticsInput: TProductStatisticsInput) {
    try {
      console.log('Filters from request', productStatisticsInput);

      const filterInput = {
        limit: 1,
        products: productStatisticsInput.products,
        userId: productStatisticsInput.userId,
        endDate: productStatisticsInput.endDate,
        startDate: productStatisticsInput.startDate,
      };

      const [[productFinancialStatistics], [productsMovementsHistory]] =
        await Promise.all([
          this.productFinancialStatisticsRepository.exec(filterInput),
          this.productsMovementsHistoryRepository.exec(filterInput),
        ]);

      const id = productFinancialStatistics.id;
      const name = productFinancialStatistics.name;
      const supplierName = productFinancialStatistics.supplierName;

      // delete repeat infos
      delete productsMovementsHistory.id;
      delete productsMovementsHistory.name;

      delete productFinancialStatistics.id;
      delete productFinancialStatistics.name;

      return {
        name,
        id,
        supplierName,
        ...productFinancialStatistics,
        ...productsMovementsHistory,
      };
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
