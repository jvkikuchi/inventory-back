import {PrismaClient} from '@prisma/client';
import {ListCategoriesUseCase} from '../domain/ListCategoriesUseCase';
import {ListCategoriesController} from '../ports/controllers/ListCategoriesController';
import {ListCategoriesRepository} from '../ports/repository/ListCategoriesRepository';

export function MakeListCategories() {
  const prismaClient = new PrismaClient();
  const listCategoriesRepository = new ListCategoriesRepository(prismaClient);
  const listCategoriesUseCase = new ListCategoriesUseCase(
    listCategoriesRepository,
  );
  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
  );
  return listCategoriesController;
}
