import { Status } from 'interfaces/index';
export interface Holiday {
  id: number;
  name: string;
  status_id: number;
  status: Status;
}
