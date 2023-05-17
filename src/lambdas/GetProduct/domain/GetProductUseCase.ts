import {GetProductRepository} from '../ports/repositories/GetProductRepository';
import {UseCase} from '../../../common/interfaces';
import type {
  TGetProductInput,
  TGetProductOutput,
} from '../../../common/types/product';

export class GetProductUseCase
  implements UseCase<TGetProductInput, TGetProductOutput>
{
  constructor(private readonly getProductRepository: GetProductRepository) {}

  async exec(input: TGetProductInput) {
    const productDTO: TGetProductInput = {
      productId: input.productId,
    };

    console.log('Product', productDTO);

    const supplier = await this.getProductRepository.exec(productDTO);

    return supplier;
  }
}
