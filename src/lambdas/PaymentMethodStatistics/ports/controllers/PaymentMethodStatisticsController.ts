import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {PaymentMethodStatisticsUseCase} from '../../domain/PaymentMethodStatisticUseCase';

export class PaymentMethodStatisticsController
  implements Controller<APIGatewayEvent>
{
  constructor(
    private readonly paymentMethodStatisticsUseCase: PaymentMethodStatisticsUseCase,
  ) {}

  async exec(event: APIGatewayEvent) {
    try {
      const {startDate, endDate, productId, userId} =
        event.queryStringParameters || {};

      const filters = {
        startDate,
        endDate,
        productId,
        userId,
      };

      const result = await this.paymentMethodStatisticsUseCase.exec(filters);

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
