import {APIGatewayEvent} from 'aws-lambda';
import {Response} from '../../common/interfaces';
import {makeUpdateProductController} from './factories/MakeUpdateProduct';

export async function bootstrap(event: APIGatewayEvent): Promise<Response> {
  try {
    const controller = makeUpdateProductController();
    const response = await controller.exec(event);

    return response;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal server error'}),
    };
  }
}
