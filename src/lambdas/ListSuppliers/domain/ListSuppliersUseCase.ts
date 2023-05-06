import {UseCase} from '../../../common/interfaces';
import {
  TListSuppliersInput,
  TListSuppliersOutput,
} from '../../../common/types/supplier';
import {ListSuppliersRepository} from '../ports/repositories/ListSuppliersRepository';

export class ListSuppliersUseCase
  implements UseCase<TListSuppliersInput, TListSuppliersOutput>
{
  constructor(
    private readonly listSuppliersRepository: ListSuppliersRepository,
  ) {}

  async exec(listSuppliersInput: TListSuppliersInput) {
    try {
      console.log('Filters from request', listSuppliersInput);

      const suppliers = await this.listSuppliersRepository.exec(
        listSuppliersInput,
      );

      return suppliers;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
