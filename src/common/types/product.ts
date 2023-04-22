export type Product = {
  id: number;
  name: string;
  description: string;
  stockQuantity: number;
  unitPrice: number;
  expirationDate: Date;
  created_at: Date;
  deleted_at: Date;
};

export type CreateProductInput = {
  name: string;
  description: string;
  stockQuantity: number;
  unitPrice: number;
  expirationDate: Date;
  supplierId: number;
  userId: string;
  categoryId: number;
};
