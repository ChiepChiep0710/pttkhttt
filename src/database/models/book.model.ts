import { number } from 'joi';
import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema(
    {
        name: { type: String },
        author: { type: String },
        category: [{ type: String }],
        image: { type: String },
        description: { type: String },
        price: { type: Number },
        sale: { type: String },
        quantity: { type: Number },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Book extends mongoose.Document {
    _id: string;
    name: string;
    author: string;
    category: string[];
    description: string;
    image: string;
    price: number;
    quantity: number;
    sale: string;
    createdAt: Date;
    updatedAt: Date;
}