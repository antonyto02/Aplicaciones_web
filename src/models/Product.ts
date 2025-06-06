import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  status: boolean;
  description: string;
  quantity: number;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Product = model<IProduct>("Product", productSchema);
