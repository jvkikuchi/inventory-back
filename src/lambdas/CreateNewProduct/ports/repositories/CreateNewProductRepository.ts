import type {PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import {Product, CreateProductInput} from '../../../../common/types/product';

export class CreateNewProductRepository
  implements Repository<CreateProductInput, Product>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(productDTO: CreateProductInput) {
    const createdProduct = await this.dbClient.$transaction(async tx => {
      const product = await tx.products.create({
        data: {
          name: productDTO.name,
          unitPrice: productDTO.unitPrice,
          description: productDTO.description,
          expirationDate: productDTO.expirationDate,
          stockQuantity: productDTO.stockQuantity,
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
}
