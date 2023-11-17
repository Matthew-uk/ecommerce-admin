import mongoose, { Schema, model, models } from "mongoose";

const modelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Product = models.Product || model("Product", modelSchema);
export default Product;
