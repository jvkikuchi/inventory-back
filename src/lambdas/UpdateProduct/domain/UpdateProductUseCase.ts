import {UseCase} from '../../../common/interfaces';
import {CreateNewMovementRepository} from '../../../common/repositories/CreateNewMovementRepository';
import {MovementsInput} from '../../../common/types/movements';
import {TProduct, TUpdateProductInput} from '../../../common/types/product';
import {GetProductRepository} from '../../../common/repositories/GetProductRepository';
import {UpdateProductRepository} from '../ports/repositories/UpdateProductRepository';

export class UpdateProductUseCase
  implements UseCase<TUpdateProductInput, TProduct>
{
  constructor(
    private readonly UpdateProductRepository: UpdateProductRepository,
    private readonly GetProductRepository: GetProductRepository,
    private readonly CreateNewMovementRepository: CreateNewMovementRepository,
  ) {}

  async exec(input: TUpdateProductInput) {
    const productDTO: TUpdateProductInput = {
      id: input.id,
      userId: input.userId,
      name: input.name,
      image: input.image,
      unitPrice: input.unitPrice,
      supplierId: input.supplierId,
      description: input.description,
      stockQuantity: input.stockQuantity,
      categoryId: input.categoryId,
      expirationDate: input.expirationDate && new Date(input.expirationDate),
    };

    console.log('ProductDTO', productDTO);

    const {stockQuantity: currentStockQuantity} =
      await this.GetProductRepository.exec({
        productId:
          typeof productDTO.id === 'string'
            ? Number(productDTO.id)
            : productDTO.id,
      });

    if (productDTO.stockQuantity !== currentStockQuantity) {
      console.log('Creating new movement...');

      const movementQuantity =
        productDTO.stockQuantity > currentStockQuantity
          ? productDTO.stockQuantity - currentStockQuantity
          : currentStockQuantity - productDTO.stockQuantity;

      const movementDTO: MovementsInput = {
        movementType:
          productDTO.stockQuantity - currentStockQuantity > 0
            ? 'ADD_TO_STOCK'
            : 'REMOVE_FROM_STOCK',
        productId:
          typeof productDTO.id === 'string'
            ? Number(productDTO.id)
            : productDTO.id,
        userId: productDTO.userId,
        quantity: movementQuantity,
      };

      await this.CreateNewMovementRepository.exec(movementDTO);
    }

    const product = await this.UpdateProductRepository.exec(productDTO);

    console.log('Updated Product', product);

    return product;
  }
}
