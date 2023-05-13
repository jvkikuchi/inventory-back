import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {UpdateProductUseCase} from '../../domain/UpdateProductUseCase';

export class UpdateProductController implements Controller<APIGatewayEvent> {
  constructor(private readonly createNewProductUseCase: UpdateProductUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const body = JSON.parse(event.body);

      const result = await this.createNewProductUseCase.exec(body);

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
