import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ICategory, IProduct, IUser } from '../interfaces';

export type ProductDocument = Products & Document;

@Schema()
export class Products implements IProduct {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, default: 0 })
  inventory: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Categories',
  })
  category: ICategory;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' })
  merchant: IUser;

  @Prop(
    raw({
      haveCash: { type: Boolean, default: true },
      haveCredit: { type: Boolean, default: true },
    }),
  )
  paymentOptions: Record<string, any>;

  @Prop(
    raw({
      courier: { type: Boolean, default: false },
      express: { type: Boolean, default: true },
      handover: { type: Boolean, default: true },
    })
  )
  delivery: Record<string, any>;

  @Prop({ type: Number, default: 0.0 })
  price: number;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
