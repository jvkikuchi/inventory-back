import {UseCase} from '../../../common/interfaces';
import {
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from '../../../common/types/category';
import {CreateCategoryRepository} from '../ports/Repositories/CreateCategoryRepository';

export class CreateCategoryUseCase
  implements UseCase<TCreateCategoryInput, TCreateCategoryOutput>
{
  constructor(
    private readonly CreateCategoryRepository: CreateCategoryRepository,
  ) {}

  async exec(input: TCreateCategoryInput) {
    const categoryDTO: TCreateCategoryInput = {
      name: input.name,
    };

    console.log('CategoryDTO', categoryDTO);

    const category = await this.CreateCategoryRepository.exec(categoryDTO);
    console.log('Category', category);

    return category;
  }
}
