import {Controller} from '../../../../common/interfaces';
import {CreateNewProductUseCase} from '../../domain/CreateNewProductUseCase';

export class CreateNewProductController implements Controller<any, any> {
  constructor(
    private readonly createNewProductUseCase: CreateNewProductUseCase,
  ) {}

  async exec(event: any) {
    try {
      const body = JSON.parse(event.body);

      await this.createNewProductUseCase.exec(body);
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
