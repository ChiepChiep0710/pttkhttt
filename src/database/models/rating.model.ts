import { number } from 'joi';
import * as mongoose from 'mongoose';

export const RatingSchema = new mongoose.Schema(
    {
        comment: { type: String },
        bookid: { type: String },

        userid: { type: String },
        rating: { type: Number },

    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
export interface Rating extends mongoose.Document {
    _id: string;
    comment: string;
    bookid: string;
    userid: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}