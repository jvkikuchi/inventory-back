import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {SuppliersFinancialStatisticsUseCase} from '../../domain/SuppliersFinancialStatisticsUseCase';

export class SuppliersFinancialStatisticsController
  implements Controller<APIGatewayEvent>
{
  constructor(
    private readonly suppliersFinancialStatisticsUseCase: SuppliersFinancialStatisticsUseCase,
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

      const result = await this.suppliersFinancialStatisticsUseCase.exec(
        filters,
      );

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
