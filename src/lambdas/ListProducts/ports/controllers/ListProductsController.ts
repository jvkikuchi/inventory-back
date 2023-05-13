import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {ListProductsUseCase} from '../../domain/ListProductsUseCase';

export class ListProductsController implements Controller<APIGatewayEvent> {
  constructor(private readonly listProductUseCase: ListProductsUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const {categories, suppliers} =
        event.multiValueQueryStringParameters || {};

      const {
        startDate,
        endDate,
        page = 1,
        pageSize = 10,
        orderBy,
        userId,
      } = event.queryStringParameters || {};

      let skip = Number(pageSize) * (Number(page) - 1);

      if (skip === 0) skip = undefined;

      const filters = {
        orderBy,
        startDate,
        endDate,
        page: Number(page),
        pageSize: Number(pageSize),
        categories: categories && categories.map(id => Number(id)),
        suppliers: suppliers && suppliers.map(id => Number(id)),
        skip,
        userId,
      };

      const result = await this.listProductUseCase.exec(filters);

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
