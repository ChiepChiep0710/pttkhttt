import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    lastToken: { type: String },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

export interface User extends mongoose.Document {
  _id: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  lastToken: string;
  createdAt: Date;
  updatedAt: Date;
}
