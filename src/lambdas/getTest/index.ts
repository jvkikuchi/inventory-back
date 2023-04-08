import { APIGatewayEvent } from "aws-lambda";
import { makeGetTestController } from "./factories/MakeGetTestController";

export async function bootstrap(event: APIGatewayEvent) {
  try {
    const controller = makeGetTestController();
    const response = await controller.exec(event);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success!", data: response }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
}
