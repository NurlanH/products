import { IInvoice } from './invoice';
import { IMonthPeriod } from './month_period';
import { IUser } from './user';

export interface ILoan {
  _id?: string;
  user?: IUser;
  invoice?: IInvoice;
  monthlyPeriod?: IMonthPeriod[];
  createdAt?: Date;
  updatedAt?: Date;
  isCompleted?: boolean;
  isDeleted?: boolean;
}
