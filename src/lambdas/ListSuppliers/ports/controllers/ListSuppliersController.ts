import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {ListSuppliersUseCase} from '../../domain/ListSuppliersUseCase';

export class ListSuppliersController implements Controller<APIGatewayEvent> {
  constructor(private readonly listSuppliersUseCase: ListSuppliersUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const {products} = event.multiValueQueryStringParameters || {};

      const {
        startDate,
        endDate,
        page = 1,
        pageSize = 10,
        orderBy,
      } = event.queryStringParameters || {};

      let skip = Number(pageSize) * (Number(page) - 1);

      if (skip === 0) skip = undefined;

      const filters = {
        orderBy,
        startDate,
        endDate,
        page: Number(page),
        pageSize: Number(pageSize),
        products: products && products.map(id => Number(id)),
        skip,
      };

      const result = await this.listSuppliersUseCase.exec(filters);

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
