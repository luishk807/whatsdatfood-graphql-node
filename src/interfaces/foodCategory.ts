import { Status } from 'interfaces/index';
export interface FoodCategory {
  id: number;
  name: string;
  status_id: number;
  status: Status;
}
