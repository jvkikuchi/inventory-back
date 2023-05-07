import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {CreateCategoryUseCase} from '../../domain/CreateCategoryUseCase';

export class CreateCategoryController implements Controller<APIGatewayEvent> {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const body = JSON.parse(event.body);

      const result = await this.createCategoryUseCase.exec(body);

      return {
        statusCode: 201,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.log('error', error);
      throw new Error(error.message);
    }
  }
}
