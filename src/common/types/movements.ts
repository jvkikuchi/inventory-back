export type Movements = {
  id: string;
  movementType: 'SELL' | 'ADD_TO_STOCK' | 'REMOVE_FROM_STOCK';
  quantity: number;
  productId: number;
  userId: string;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;
};

export type MovementsInput = {
  movementType: 'SELL' | 'ADD_TO_STOCK' | 'REMOVE_FROM_STOCK';
  quantity: number;
  productId: number;
  userId: string;
};
