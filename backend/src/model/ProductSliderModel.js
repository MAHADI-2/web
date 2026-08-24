import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductSliderModel = mongoose.model("productsliders", DataSchema);

export default ProductSliderModel;