import { number } from 'joi';
import * as mongoose from 'mongoose';

export const StorageSchema = new mongoose.Schema(
    {
        quantity: { type: Number },
        bookid: { type: String }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Storage extends mongoose.Document {
    _id: string;
    quantity: number;
    bookid: string;
    createdAt: Date;
    updatedAt: Date;
}