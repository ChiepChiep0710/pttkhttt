import { number } from 'joi';
import * as mongoose from 'mongoose';

export const BillSchema = new mongoose.Schema(
    {
        address: { type: String },
        phonenumber: { type: String },
        name: { type: String },
        checkout_result: [{ type: Object }],
        price: { type: Number },
        userid: { type: String },
        voucher: { type: String },
        status: { type: String }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Bill extends mongoose.Document {
    _id: string;
    address: string,
    phonenumber: string,
    userid: string,
    status: string,
    name: string,
    voucher: string,
    price: number,
    checkout_result: Object[],
    createdAt: Date;
    updatedAt: Date;
}