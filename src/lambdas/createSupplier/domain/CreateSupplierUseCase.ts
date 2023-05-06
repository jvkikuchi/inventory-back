import {UseCase} from '../../../common/interfaces';
import {Supplier, CreateSupplierInput} from '../../../common/types/supplier';
import {CreateSupplierRepository} from '../ports/repositories/CreateSupplierRepository';

export class CreateSupplierUseCase
  implements UseCase<CreateSupplierInput, Supplier>
{
  constructor(
    private readonly createSupplierRepository: CreateSupplierRepository,
  ) {}

  async exec(input: CreateSupplierInput) {
    const supplierDTO: CreateSupplierInput = {
      name: input.name,
      address: input.address,
      phone: input.phone,
      email: input.email,
    };

    console.log('Product', supplierDTO);

    const supplier = await this.createSupplierRepository.exec(supplierDTO);
    console.log('Supplier', supplier);

    return supplier;
  }
}
