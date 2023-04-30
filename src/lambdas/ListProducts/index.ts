import {APIGatewayEvent} from 'aws-lambda';
import {Response} from '../../common/interfaces';
import {makeListProductsController} from './factories/MakeListProductsController';

export async function bootstrap(event: APIGatewayEvent): Promise<Response> {
  try {
    const controller = makeListProductsController();
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
