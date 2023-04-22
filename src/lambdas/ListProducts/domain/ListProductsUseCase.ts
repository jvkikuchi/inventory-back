import {UseCase} from '../../../common/interfaces';
import {
  TListProductsInput,
  TListProductsOutput,
} from '../../../common/types/product';
import {ListProductsRepository} from '../ports/repositories/ListProductsRepository';

export class ListProductsUseCase
  implements UseCase<TListProductsInput, TListProductsOutput>
{
  constructor(private readonly listProductRepository: ListProductsRepository) {}

  async exec(listProductsInput: TListProductsInput) {
    console.log('Filters from request', listProductsInput);

    const products = await this.listProductRepository.exec(listProductsInput);

    return products;
  }
}
