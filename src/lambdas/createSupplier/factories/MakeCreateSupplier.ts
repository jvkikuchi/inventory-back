import {PrismaClient} from '@prisma/client';
import {CreateSupplierRepository} from '../ports/repositories/CreateSupplierRepository';
import {CreateSupplierUseCase} from '../domain/CreateSupplierUseCase';
import {CreateSupplierController} from '../ports/controllers/CreateSupplierController';

export function MakeCreateSupplier() {
  const dbClient = new PrismaClient();

  const createSupplierRepository = new CreateSupplierRepository(dbClient);
  const createSupplierUseCase = new CreateSupplierUseCase(
    createSupplierRepository,
  );
  const createSupplierController = new CreateSupplierController(
    createSupplierUseCase,
  );

  return createSupplierController;
}
