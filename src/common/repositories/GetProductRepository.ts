import {PrismaClient} from '@prisma/client';
import {Repository} from '../interfaces';
import {TGetProductInput, TGetProductOutput} from '../types/product';

export class GetProductRepository
  implements Repository<TGetProductInput, TGetProductOutput>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(ProductDTO: TGetProductInput) {
    const product = await this.dbClient.products.findUnique({
      where: {
        id: Number(ProductDTO.productId),
      },
      include: {
        category: {
          select: {
            categoryId: true,
          },
        },
        productSuppliers: {
          select: {
            supplierId: true,
          },
        },
      },
    });

    const categoriesId = product.category.map(({categoryId}) => categoryId);
    const suppliersId = product.productSuppliers.map(
      ({supplierId}) => supplierId,
    );

    const [categories, suppliers] = await Promise.all([
      this.dbClient.category.findMany({where: {id: {in: categoriesId}}}),
      this.dbClient.suppliers.findMany({where: {id: {in: suppliersId}}}),
    ]);

    const {
      created_at,
      deleted_at,
      description,
      expirationDate,
      id,
      name,
      stockQuantity,
      image,
      userId,
      unitPrice,
      updated_at,
    } = product;

    const productDTO: TGetProductOutput = {
      created_at,
      deleted_at,
      description,
      expirationDate,
      id,
      name,
      stockQuantity,
      image,
      userId,
      unitPrice,
      updated_at,
      categories,
      suppliers,
    };

    return productDTO;
  }
}
