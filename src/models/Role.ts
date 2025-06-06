import { model, Schema, Types } from "mongoose";

export interface IRole {
  _id: Types.ObjectId;
  type: string;
  name: string;
  createdAt: Date;
  status: boolean;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Role = model<IRole>("Role", roleSchema, "role");
