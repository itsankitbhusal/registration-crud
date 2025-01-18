import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetToken?: string | null;
  resetTokenExpires?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
