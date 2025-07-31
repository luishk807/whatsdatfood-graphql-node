import { Status } from 'interfaces/index';
export interface HolidayBase {
  id: number;
  name: string;
  date_assigned: Date;
  status_id: number;
  status: Status;
}

export interface Holiday extends HolidayBase {
  status: Status;
}
