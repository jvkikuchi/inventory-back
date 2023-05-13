import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {SuppliersStatisticsUseCase} from '../../domain/SuppliersStatisticsUseCase';

export class SuppliersStatisticsController
  implements Controller<APIGatewayEvent>
{
  constructor(
    private readonly suppliersStatisticsUseCase: SuppliersStatisticsUseCase,
  ) {}

  async exec(event: APIGatewayEvent) {
    try {
      const {startDate, endDate} = event.queryStringParameters || {};
      const {userId, supplierId} = event.pathParameters;

      const filters = {
        userId,
        startDate,
        endDate,
        suppliers: [supplierId],
      };

      const result = await this.suppliersStatisticsUseCase.exec(filters);

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
