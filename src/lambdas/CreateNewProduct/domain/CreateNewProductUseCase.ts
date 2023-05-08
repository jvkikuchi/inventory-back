import {UseCase} from '../../../common/interfaces';
import {CreateNewMovementRepository} from '../../../common/repositories/CreateNewMovementRepository';
import {MovementsInput} from '../../../common/types/movements';
import {TProduct, TCreateProductInput} from '../../../common/types/product';
import {CreateNewProductRepository} from '../ports/repositories/CreateNewProductRepository';

export class CreateNewProductUseCase
  implements UseCase<TCreateProductInput, TProduct>
{
  constructor(
    private readonly createNewProductRepository: CreateNewProductRepository,
    private readonly createNewMovementRepository: CreateNewMovementRepository,
  ) {}

  async exec(input: TCreateProductInput) {
    const productDTO: TCreateProductInput = {
      name: input.name,
      userId: input.userId,
      image: input.image,
      unitPrice: input.unitPrice,
      supplierId: input.supplierId,
      description: input.description,
      stockQuantity: input.stockQuantity,
      categoryId: input.categoryId,
      expirationDate: input.expirationDate && new Date(input.expirationDate),
    };

    console.log('ProductDTO', productDTO);

    const product = await this.createNewProductRepository.exec(productDTO);

    console.log('Created Product', product);

    const movementDTO: MovementsInput = {
      userId: input.userId,
      quantity: input.stockQuantity,
      productId: product.id,
      movementType: 'ADD_TO_STOCK',
    };

    await this.createNewMovementRepository.exec(movementDTO);

    return product;
  }
}
