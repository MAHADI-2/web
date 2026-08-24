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
    invoiceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "invoices",
      required: true,
    },
    qty: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number  },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InvoiceProductModel = mongoose.model("invoiceproducts", DataSchema);

export default InvoiceProductModel;