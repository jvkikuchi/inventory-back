import type {PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import {TProduct, TCreateProductInput} from '../../../../common/types/product';

export class CreateNewProductRepository
  implements Repository<TCreateProductInput, TProduct>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(productDTO: TCreateProductInput) {
    const createdProduct = await this.dbClient.$transaction(async tx => {
      const product = await tx.products.create({
        data: {
          userId: productDTO.userId,
          name: productDTO.name,
          unitPrice: productDTO.unitPrice,
          description: productDTO.description,
          expirationDate: productDTO.expirationDate,
          stockQuantity: productDTO.stockQuantity,
          image: productDTO.image,
        },
      });

      await tx.productCategories.create({
        data: {
          categoryId: productDTO.categoryId,
          productId: product.id,
        },
      });

      await tx.productSuppliers.create({
        data: {
          supplierId: productDTO.supplierId,
          productId: product.id,
        },
      });

      await tx.movements.create({
        data: {
          movementType: 'ADD_TO_STOCK',
          quantity: productDTO.stockQuantity,
          productId: product.id,
          userId: productDTO.userId,
        },
      });

      return product;
    });
    return createdProduct;
  }
  catch(error) {
    console.log('Error', error);
    throw new Error(error.message);
  }
}
