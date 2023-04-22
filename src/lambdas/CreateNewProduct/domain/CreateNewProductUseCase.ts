import {UseCase} from '../../../common/interfaces';
import {CreateNewMovementRepository} from '../../../common/repositories/CreateNewMovementRepository';
import {MovementsInput} from '../../../common/types/movements';
import {Product, ProductInput} from '../../../common/types/product';
import {CreateNewProductRepository} from '../ports/repositories/CreateNewProductRepository';
import {PrismaClient} from '@prisma/client';

export class CreateNewProductUseCase implements UseCase<ProductInput, Product> {
  constructor(
    private readonly createNewProductRepository: CreateNewProductRepository,
    private readonly createNewMovementRepository: CreateNewMovementRepository,
  ) {}

  async exec(input: ProductInput) {
    const productDTO: ProductInput = {
      name: input.name,
      description: input.description,
      stockQuantity: input.stockQuantity,
      unitPrice: input.unitPrice,
      expirationDate: new Date(input.expirationDate),
    };

    console.log('productDTO', productDTO);

    const product = await this.createNewProductRepository.exec(productDTO);

    console.log('Created Product', product);

    const prisma = new PrismaClient();

    await prisma.productSuppliers.create({
      data: {
        productId: product.id,
        supplierId: 1,
      },
    });

    const movementDTO: MovementsInput = {
      movementType: 'ADD_TO_STOCK',
      productId: product.id,
      userId: '1',
      quantity: input.stockQuantity,
    };

    await this.createNewMovementRepository.exec(movementDTO);

    return product;
  }
}
