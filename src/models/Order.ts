import { model, Schema, Types } from "mongoose";

export interface IOrder {
  _id: Types.ObjectId;
  createdAt: Date;
  createdBy: Schema.Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  total: number;
  subtotal: number;
  status: string;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [
    {
      product: {
        type: Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Order = model<IOrder>("Order", orderSchema, "order");
