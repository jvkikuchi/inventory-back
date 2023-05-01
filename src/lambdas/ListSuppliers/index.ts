import {APIGatewayEvent} from 'aws-lambda';
import {Response} from '../../common/interfaces';
import {MakeListSuppliers} from './factories/MakeListSuppliers';

export async function bootstrap(event: APIGatewayEvent): Promise<Response> {
  try {
    const controller = MakeListSuppliers();
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
