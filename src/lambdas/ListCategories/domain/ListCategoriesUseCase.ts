import {UseCase} from '../../../common/interfaces';
import {TListCategoryOutput} from '../../../common/types/category';
import {ListCategoriesRepository} from '../ports/repository/ListCategoriesRepository';

export class ListCategoriesUseCase
  implements UseCase<string, TListCategoryOutput>
{
  constructor(
    private readonly listCategoriesRepository: ListCategoriesRepository,
  ) {}

  async exec() {
    try {
      const categories = await this.listCategoriesRepository.exec();

      return categories;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
