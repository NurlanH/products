import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IInvoice, ILoan, IMonthPeriod, IUser } from '../interfaces';

export type LoanDocument = Loans & Document;

@Schema()
export class Loans implements ILoan {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Invoices',
  })
  invoice: IInvoice;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  })
  user: IUser;

  @Prop([{ type: Array, required: true }])
  monthlyPeriod: IMonthPeriod[];

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: false })
  isCompleted: boolean;
}

export const LoanSchema = SchemaFactory.createForClass(Loans);
