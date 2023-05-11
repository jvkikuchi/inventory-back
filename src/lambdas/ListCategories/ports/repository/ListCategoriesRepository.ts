import type {PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import type {
  TListCategoryInput,
  TListCategoryOutput,
} from '../../../../common/types/category';

export class ListCategoriesRepository
  implements Repository<TListCategoryInput, TListCategoryOutput>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(filterInput: TListCategoryInput) {
    try {
      const {userId} = filterInput;

      const where = [userId && {userId: {equals: userId}}];

      console.log('Where clauses', where);

      const categories = await this.dbClient.category.findMany({
        orderBy: {name: 'asc'},
      });

      return {categories};
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
