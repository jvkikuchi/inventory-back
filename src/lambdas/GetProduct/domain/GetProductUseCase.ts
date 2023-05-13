import {UseCase} from '../../../common/interfaces';
import {GetProductRepository} from '../../../common/repositories/GetProductRepository';
import type {TGetProductInput} from '../../../common/types/product';
import type {Products} from '@prisma/client';

export class GetProductUseCase implements UseCase<TGetProductInput, Products> {
  constructor(private readonly getProductRepository: GetProductRepository) {}

  async exec(input: TGetProductInput) {
    const productDTO: TGetProductInput = {
      productId: input.productId,
    };

    console.log('Product', productDTO);

    const product = await this.getProductRepository.exec(productDTO);

    return product;
  }
}
