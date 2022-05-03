import { IOrder } from './order';
import { IUser } from './user';

export interface IInvoice {
  _id?: string;
  payer?: IUser;
  order?: IOrder;
  isPaid?: boolean;
  paidDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  isCompleted?: boolean;
}
