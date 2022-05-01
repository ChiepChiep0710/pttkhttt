import * as mongoose from 'mongoose'
export const gpslogSchema = new mongoose.Schema(
    {
        userId: { type: String },
        logLocation: { type: Array, default: [] },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
)
export interface gpslog extends mongoose.Document {
    _id: string;
    userId: string;
    logLocation: [Object];
    createdAt: Date;
    updatedAt: Date;
}