import { IProduct } from './product';
import { IUser } from './user';

export interface IOrder {
  _id?: string;
  name?: string;
  buyer?: IUser;
  seller?: IUser;
  product?: IProduct;
  address?: string;
  deliveryMethod?: string;
  status?: string;
  isCredit?: boolean;
  isCash?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  isCompleted?: boolean;
}
