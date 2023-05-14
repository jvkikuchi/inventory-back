import type {TProductsFinancialStatisticsOutput} from './product';
import type {TSuppliersFinancialStatisticsOutput} from './supplier';

export type TStatisticsInput = {
  userId: string;
  suppliers?: string[];
  products?: string[];
  startDate?: string;
  endDate?: string;
  limit?: number;
};

export type TStatisticsOutput = {
  productsFinancialStatistics: TProductsFinancialStatisticsOutput[];
  suppliersFinancialStatistics: TSuppliersFinancialStatisticsOutput[];
};
