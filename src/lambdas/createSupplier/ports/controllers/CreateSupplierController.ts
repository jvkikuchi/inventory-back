import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {CreateSupplierUseCase} from '../../domain/CreateSupplierUseCase';

export class CreateSupplierController implements Controller<APIGatewayEvent> {
  constructor(private readonly createSupplierUseCase: CreateSupplierUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const body = JSON.parse(event.body);

      const result = await this.createSupplierUseCase.exec(body);

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
