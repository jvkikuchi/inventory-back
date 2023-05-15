import type {PrismaClient} from '@prisma/client';
import {Repository} from '../../../../common/interfaces';
import type {TListCategoryOutput} from '../../../../common/types/category';

export class ListCategoriesRepository
  implements Repository<string, TListCategoryOutput>
{
  constructor(private readonly dbClient: PrismaClient) {}

  async exec(filterInput: string) {
    try {
      const categories = await this.dbClient.category.findMany({
        orderBy: {name: 'asc'},
        select: {
          id: true,
          name: true,
        },
        where: {
          productCategories: {
            some: {
              product: {
                userId: filterInput,
              },
            },
          },
        },
      });

      return {categories};
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
