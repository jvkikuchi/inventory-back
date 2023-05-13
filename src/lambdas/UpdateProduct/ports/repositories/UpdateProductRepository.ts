import type {PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import {TProduct, TUpdateProductInput} from '../../../../common/types/product';

export class UpdateProductRepository
  implements Repository<TUpdateProductInput, TProduct>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(productDTO: TUpdateProductInput) {
    const updateProduct = await this.dbClient.$transaction(async tx => {
      const product = await tx.products.update({
        data: {
          // por enquanto vamos deixar só para atualizar a quantidade em estoque
          stockQuantity: productDTO.stockQuantity,
        },
        where: {
          id: productDTO.id,
        },
      });

      return product;
    });
    return updateProduct;
  }
  catch(error) {
    console.log('Error', error);
    throw new Error(error.message);
  }
}
