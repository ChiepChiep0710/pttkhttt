import { number } from 'joi';
import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema(
    {
        name: { type: String },
        author: { type: String },
        category: { type: Array, default: [] },
        image: { type: String },
        description: { type: String },
        price: { type: Number },
        rating: { type: Array, default: [] },
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
    category: [string];
    description: string;
    image: string;
    price: number;
    rating: [string];
    saleid: string;
    createdAt: Date;
    updatedAt: Date;
}