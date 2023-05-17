import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {GetProductUseCase} from '../../domain/GetProductUseCase';

export class GetProductController implements Controller<APIGatewayEvent> {
  constructor(private readonly getProductUseCase: GetProductUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const {productId} = event.pathParameters || {};

      const result = await this.getProductUseCase.exec({productId});

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.log('error', error);
      throw new Error(error.message);
    }
  }
}
