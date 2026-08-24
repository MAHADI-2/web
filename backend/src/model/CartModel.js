import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    qty: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CartModel = mongoose.model("carts", DataSchema);

export default CartModel;