import {PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import {Supplier, CreateSupplierInput} from '../../../../common/types/supplier';

export class CreateSupplierRepository
  implements Repository<CreateSupplierInput, Supplier>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(SupplierDTO: CreateSupplierInput) {
    const supplier = await this.dbClient.suppliers.create({
      data: {
        name: SupplierDTO.name,
        address: SupplierDTO.address,
        phone: SupplierDTO.phone,
        email: SupplierDTO.email,
      },
    });

    return supplier;
  }
}
