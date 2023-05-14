import {PrismaClient} from '@prisma/client';
import {GetProductUseCase} from '../domain/GetProductUseCase';
import {GetProductController} from '../ports/controllers/GetProductController';
import {GetProductRepository} from '../../../common/repositories/GetProductRepository';

export function makeGetProductController() {
  const dbClient = new PrismaClient();

  const getProductRepository = new GetProductRepository(dbClient);
  const getProductUseCase = new GetProductUseCase(getProductRepository);
  const getProductController = new GetProductController(getProductUseCase);

  return getProductController;
}
