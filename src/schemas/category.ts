import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICategory } from '../interfaces';

export type CategoryDocument = Categories & Document;

@Schema()
export class Categories implements ICategory {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, default: 0 })
  productCount: number;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Categories);
