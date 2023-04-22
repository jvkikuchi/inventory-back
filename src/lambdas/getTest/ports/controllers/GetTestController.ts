import {Controller} from '../../../../common/interfaces';
import {APIGatewayEvent} from 'aws-lambda';
import {GetTestUseCase} from '../../domain/GetTestUseCase';

export class GetTestController implements Controller<APIGatewayEvent> {
  constructor(private readonly getTestUseCase: GetTestUseCase) {}

  async exec(event: APIGatewayEvent) {
    try {
      const body = JSON.parse(event.body);

      const result = await this.getTestUseCase.exec(body);

      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
