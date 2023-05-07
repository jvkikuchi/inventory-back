import {PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import {
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from '../../../../common/types/category';

export class CreateCategoryRepository
  implements Repository<TCreateCategoryInput, TCreateCategoryOutput>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(categoryDTO: TCreateCategoryInput) {
    const createdCategory = await this.dbClient.category.create({
      data: {
        name: categoryDTO.name,
      },
    });

    return {
      category: createdCategory,
    };
  }
}
