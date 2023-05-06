import {PrismaClient} from '@prisma/client';
import {ListSuppliersUseCase} from '../domain/ListSuppliersUseCase';
import {ListSuppliersController} from '../ports/controllers/ListSuppliersController';
import {ListSuppliersRepository} from '../ports/repositories/ListSuppliersRepository';

export function MakeListSuppliers() {
  const prismaClient = new PrismaClient();
  const listSuppliersRepository = new ListSuppliersRepository(prismaClient);
  const listSuppliersUseCase = new ListSuppliersUseCase(
    listSuppliersRepository,
  );
  const listSuppliersController = new ListSuppliersController(
    listSuppliersUseCase,
  );
  return listSuppliersController;
}
