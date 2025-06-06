import { model, Schema, Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    username: string;
    password: string;
    email: string;
    role: string;
    phone: string;
    status: boolean;
    createDate: Date;
    deleteDate: Date;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date,
        default: Date.now
    }
});

export const User = model<IUser>('User', userSchema, 'user');
