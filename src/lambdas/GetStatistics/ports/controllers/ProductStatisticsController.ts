import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {GetStatisticsUseCase} from '../../domain/StatisticsUseCase';

export class GetStatisticsController implements Controller<APIGatewayEvent> {
  constructor(private readonly getStatisticsUseCase: GetStatisticsUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const {products, suppliers} = event.multiValueQueryStringParameters || {};

      const {startDate, endDate, limit} = event.queryStringParameters || {};
      const {userId} = event.pathParameters;

      const filters = {
        userId,
        startDate,
        endDate,
        products,
        limit: typeof limit === 'string' ? Number(limit) : limit,
        suppliers,
      };

      const result = await this.getStatisticsUseCase.exec(filters);

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
