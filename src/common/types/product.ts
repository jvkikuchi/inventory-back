import type {Products, Category, Suppliers} from '@prisma/client';

export type TProduct = {
  id: number;
  name: string;
  description?: string;
  userId: string;
  stockQuantity: number;
  unitPrice: number;
  expirationDate?: Date;
  created_at: Date;
  deleted_at: Date;
};

export type TGetProductInput = {
  productId: string;
};

export type TGetProductOutput = Products & {
  categories: Category[];
  suppliers: Suppliers[];
};

export type TCreateProductInput = {
  name: string;
  description?: string;
  stockQuantity: number;
  unitPrice: number;
  expirationDate?: Date;
  supplierId: number;
  userId: string;
  categoryId: number;
  image?: string;
};

export type TListProductsInput = {
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
  userId: string;
  orderBy?: string;
  categories?: number[];
  suppliers?: number[];
  skip?: number;
};

export type TListProductsOutput = {
  products: TProduct[];
  count: number;
  totalPages: number;
};
