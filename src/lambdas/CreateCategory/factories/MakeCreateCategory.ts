import {PrismaClient} from '@prisma/client';
import {CreateCategoryController} from '../ports/Controllers/CreateCategoryController';
import {CreateCategoryRepository} from '../ports/Repositories/CreateCategoryRepository';
import {CreateCategoryUseCase} from '../domain/CreateCategoryUseCase';

export function MakeCreateCategory() {
  const dbClient = new PrismaClient();

  const createCategoryRepository = new CreateCategoryRepository(dbClient);

  const createCategoryUseCase = new CreateCategoryUseCase(
    createCategoryRepository,
  );

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
  );

  return createCategoryController;
}
