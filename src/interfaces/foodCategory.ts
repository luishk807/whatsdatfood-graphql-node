import { Status } from 'interfaces/index';
export interface FoodCategoryBase {
  id: number;
  name: string;
  status_id: number;
}

export interface FoodCategory extends FoodCategoryBase {
  status: Status;
}
