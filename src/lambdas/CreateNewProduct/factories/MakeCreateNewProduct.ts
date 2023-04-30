import {PrismaClient} from '@prisma/client';
import {CreateNewMovementRepository} from '../../../common/repositories/CreateNewMovementRepository';
import {CreateNewProductUseCase} from '../domain/CreateNewProductUseCase';
import {CreateNewProductController} from '../ports/controllers/CreateNewProductController';
import {CreateNewProductRepository} from '../ports/repositories/CreateNewProductRepository';

export function makeCreateNewProductController() {
  const dbClient = new PrismaClient();

  const createNewProductRepository = new CreateNewProductRepository(dbClient);
  const createNewMovementRepository = new CreateNewMovementRepository(dbClient);

  const createNewProductUseCase = new CreateNewProductUseCase(
    createNewProductRepository,
    createNewMovementRepository,
  );

  const createNewProductController = new CreateNewProductController(
    createNewProductUseCase,
  );
  return createNewProductController;
}
