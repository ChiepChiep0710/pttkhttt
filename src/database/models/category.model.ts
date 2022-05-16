import { number } from 'joi';
import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
    {
        name: { type: String }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Category extends mongoose.Document {
    _id: string;
    percent: string;
    createdAt: Date;
    updatedAt: Date;
}