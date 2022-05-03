import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DeliveryMethod, OrderStatus } from 'src/enums';
import { IOrder, IProduct, IUser } from '../interfaces';

export type OrderDocument = Orders & Document;

@Schema()
export class Orders implements IOrder {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' })
  buyer: IUser;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' })
  seller: IUser;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Products',
  })
  product: IProduct;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true, default: DeliveryMethod.HANDOVER })
  deliveryMethod: string;

  @Prop({ type: String, required: true, default: OrderStatus.ORDER_RECEIVED })
  status: string;

  @Prop({ type: Boolean, required: true, default: false })
  isCredit: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isCash: boolean;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: false })
  isCompleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
