import { number } from 'joi';
import * as mongoose from 'mongoose';

export const SaleSchema = new mongoose.Schema(
    {
        name: { type: String },
        percent: { type: Number }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Sale extends mongoose.Document {
    _id: string;
    name: string;
    percent: number;
    createdAt: Date;
    updatedAt: Date;
}