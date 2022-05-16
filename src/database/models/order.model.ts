import { number } from 'joi';
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
    {
        name: { type: String },
        author: { type: String },
        category: { type: Array, default: [] },
        description: { type: String },
        price: { type: Number },
        rating: { type: Number },
        saleid: { type: String },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Book extends mongoose.Document {
    _id: string;
    name: string;
    author: string;
    category: [string],
    description: string;
    price: number;
    rating: number;
    saleid: string;
    createdAt: Date;
    updatedAt: Date;
}