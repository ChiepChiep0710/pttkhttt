import { number } from 'joi';
import * as mongoose from 'mongoose';

export const VoucherSchema = new mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        code: { type: String },
        percent: { type: Number },

    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Voucher extends mongoose.Document {
    _id: string;
    name: string;
    description: string;
    code: string;
    percent: number;
    createdAt: Date;
    updatedAt: Date;
}