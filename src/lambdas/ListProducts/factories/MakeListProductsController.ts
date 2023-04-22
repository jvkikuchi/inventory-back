import {PrismaClient} from '@prisma/client';
import {ListProductsUseCase} from '../domain/ListProductsUseCase';
import {ListProductsController} from '../ports/controllers/ListProductsController';
import {ListProductsRepository} from '../ports/repositories/ListProductsRepository';

export function makeListProductsController() {
  const prismaClient = new PrismaClient();
  const listProductRepository = new ListProductsRepository(prismaClient);
  const listProductsUseCase = new ListProductsUseCase(listProductRepository);
  const listProductsController = new ListProductsController(
    listProductsUseCase,
  );
  return listProductsController;
}
