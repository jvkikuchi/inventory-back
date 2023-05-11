import {UseCase} from '../../../common/interfaces';
import {ListSellsRepository} from '../../../common/repositories/ListSellsRepository';
import {TListSalesInput} from '../../../common/types/sellHistory';
import {TPaymentMethodStatisticOutput} from '../../../common/types/paymentMethodStatistics';

export class PaymentMethodStatisticsUseCase
  implements UseCase<TListSalesInput, TPaymentMethodStatisticOutput>
{
  constructor(private readonly listSellsRepository: ListSellsRepository) {}

  async exec(listSellsInput: TListSalesInput) {
    try {
      console.log('Filters from request', listSellsInput);

      const sales = await this.listSellsRepository.exec(listSellsInput);

      const {pix, cash, debit, credit} = sales.reduce(
        (acc, cr) => {
          const paymentMethodLowerCase = cr.paymentMethod.toLowerCase();

          // 0 === false xD
          if (paymentMethodLowerCase in acc) {
            const newValue = acc[paymentMethodLowerCase] + 1;

            acc[paymentMethodLowerCase] = newValue;

            return acc;
          }
          return acc;
        },
        {
          pix: 0,
          cash: 0,
          debit: 0,
          credit: 0,
        },
      );

      const total = sales.length;
      const statisticOutput = {
        total,
        integer: {
          pix,
          cash,
          debit,
          credit,
        },
        percentage: {
          pix: pix / total,
          cash: cash / total,
          debit: debit / total,
          credit: credit / total,
        },
      };

      return statisticOutput;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
