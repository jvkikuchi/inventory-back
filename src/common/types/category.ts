export type TCategory = {
  id: number;
  name: string;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;
};

export type TCreateCategoryInput = {
  name: string;
};

export type TCreateCategoryOutput = {
  category: TCategory;
};

export type TListCategoryOutput = {
  categories: Pick<TCategory, 'id' | 'name'>[];
};
