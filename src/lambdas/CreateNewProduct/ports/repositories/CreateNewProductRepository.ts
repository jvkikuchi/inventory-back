import type {PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import {Product, ProductInput} from '../../../../common/types/product';

export class CreateNewProductRepository
  implements Repository<ProductInput, Product>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(productDTO: ProductInput) {
    const product = await this.dbClient.products.create({data: productDTO});

    return product;
  }
}
