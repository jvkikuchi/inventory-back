import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {ProductStatisticsUseCase} from '../../domain/ProductStatisticsUseCase';

export class ProductStatisticsController
  implements Controller<APIGatewayEvent>
{
  constructor(
    private readonly productStatisticsUseCase: ProductStatisticsUseCase,
  ) {}

  async exec(event: APIGatewayEvent) {
    try {
      const {startDate, endDate} = event.queryStringParameters || {};
      const {userId, productId} = event.pathParameters;

      const filters = {
        userId,
        startDate,
        endDate,
        products: [productId],
      };

      const result = await this.productStatisticsUseCase.exec(filters);

      return {
        statusCode: 200,
        body: JSON.stringify(
          result,
          (_key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged)),
        ),
      };
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
