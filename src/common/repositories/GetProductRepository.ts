import type {PrismaClient} from '@prisma/client';
import {Repository} from '../interfaces';
import {TProduct, TGetProductInput} from '../types/product';

export class GetProductRepository
  implements Repository<TGetProductInput, TProduct>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(productDTO: TGetProductInput) {
    const product = await this.dbClient.products.findUnique({
      where: {id: productDTO.productId},
    });

    return product;
  }
  catch(error) {
    console.log('Error', error);
    throw new Error(error.message);
  }
}
