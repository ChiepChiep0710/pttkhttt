import { number } from 'joi';
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
    {
        bookid: { type: String },
        quantity: { type: Number },
        price: { type: Number },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Order extends mongoose.Document {
    _id: string;
    bookid: string,
    quantity: number,
    price: number,
    createdAt: Date;
    updatedAt: Date;
}