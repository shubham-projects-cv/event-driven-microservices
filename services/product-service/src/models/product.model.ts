import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  userId: string;
  name: string;
  price: number;
  description: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
