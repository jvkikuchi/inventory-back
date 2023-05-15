import {APIGatewayEvent} from 'aws-lambda';
import {Controller} from '../../../../common/interfaces';
import {ListCategoriesUseCase} from '../../domain/ListCategoriesUseCase';

export class ListCategoriesController implements Controller<APIGatewayEvent> {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const result = await this.listCategoriesUseCase.exec();

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
