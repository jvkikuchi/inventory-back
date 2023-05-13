import {UseCase} from '../../../common/interfaces';
import {
  TListCategoryOutput,
  TListCategoryInput,
} from '../../../common/types/category';
import {ListCategoriesRepository} from '../ports/repository/ListCategoriesRepository';

export class ListCategoriesUseCase
  implements UseCase<TListCategoryInput, TListCategoryOutput>
{
  constructor(
    private readonly listCategoriesRepository: ListCategoriesRepository,
  ) {}

  async exec(listCategoriesInput: TListCategoryInput) {
    try {
      console.log('Filters from request', listCategoriesInput);

      const categories = await this.listCategoriesRepository.exec(
        listCategoriesInput,
      );

      return categories;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error.message);
    }
  }
}
