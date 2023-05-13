export type Supplier = {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  created_at: Date;
  deleted_at?: Date;
  updated_at: Date;
};

export type CreateSupplierInput = {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
};

export type TListSuppliersInput = {
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
  products?: number[];
  orderBy?: string;
  skip?: number;
};

export type TListSuppliersOutput = {
  suppliers: Supplier[];
  count: number;
  totalPages: number;
};

export type TSuppliersFinancialStatisticsInput = {
  userId: string;
  suppliers?: string[];
  startDate?: string;
  endDate?: string;
  limit?: number;
};

type salesHistory = {
  productId: number;
  movementId: number;
  paymentMethod: string;
  quantity: number;
  sellDate: Date;
};

export type TSuppliersFinancialStatisticsOutput = {
  id: number;
  name: string;
  salesHistory: salesHistory[];
  totalSales: bigint;
  creditSales: bigint;
  pixSales: bigint;
  debitSales: bigint;
  cashSales: bigint;
};
