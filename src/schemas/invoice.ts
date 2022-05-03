import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IInvoice, IOrder, IUser } from '../interfaces';

export type InvoiceDocument = Invoices & Document;

@Schema()
export class Invoices implements IInvoice {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' })
  payer: IUser;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Orders' })
  order: IOrder;
  
  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Date, default: new Date() })
  paidDate: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: Boolean, default: false })
  isCompleted: boolean;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoices);
