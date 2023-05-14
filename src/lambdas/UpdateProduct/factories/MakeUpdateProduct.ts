import {PrismaClient} from '@prisma/client';
import {UpdateProductUseCase} from '../domain/UpdateProductUseCase';
import {UpdateProductController} from '../ports/controllers/UpdateProductController';
import {UpdateProductRepository} from '../ports/repositories/UpdateProductRepository';
import {GetProductRepository} from '../../../common/repositories/GetProductRepository';
import {CreateNewMovementRepository} from '../../../common/repositories/CreateNewMovementRepository';

export function makeUpdateProductController() {
  const dbClient = new PrismaClient();

  const updateProductRepository = new UpdateProductRepository(dbClient);
  const getProductRepository = new GetProductRepository(dbClient);
  const createNewMovementRepository = new CreateNewMovementRepository(dbClient);

  const updateProductUseCase = new UpdateProductUseCase(
    updateProductRepository,
    getProductRepository,
    createNewMovementRepository,
  );

  const updateProductController = new UpdateProductController(
    updateProductUseCase,
  );
  return updateProductController;
}
