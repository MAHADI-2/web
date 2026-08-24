import CartModel from "./model/CartModel.js";
import WishModel from "./model/WishModel.js";
import mongoose from "mongoose";

let ObjectId = mongoose.Types.ObjectId;

export const cartService = async (req) => {
  try {
    // সেফটি চেক: req.user না থাকলে এরর থ্রো করবে
    if (!req.user || !req.user._id) {
      throw new Error("Not authorized, user not found");
    }

    const user_id = req.user._id;
    const { productID, qty, size, color } = req.body;

    // ১. কার্টে প্রোডাক্ট সেভ করা
    const data = await CartModel.create({
      userID: new ObjectId(user_id),
      productID: new ObjectId(productID),
      qty,
      size,
      color
    });

    // ২. উইশলিস্ট থেকে প্রোডাক্ট রিমুভ করা (findByIdAndDelete এর বদলে findOneAndDelete ব্যবহার করতে হবে)
    await WishModel.findOneAndDelete({
      userID: new ObjectId(user_id),
      productID: new ObjectId(productID),
    });

    return { status: "success", data: data };

  } catch (error) {
    throw new Error(error.message);  
  }
};

export const readCartService = async (req) => {
  try {
    if (!req.user || !req.user._id) {
      throw new Error("Not authorized, user not found");
    }

    const user_id = req.user._id;
    
    // অনেকগুলো কার্ট আইটেম খোঁজার জন্য find() ব্যবহার করতে হবে (findById নয়)
    const data = await CartModel.find({
        userID: new ObjectId(user_id)
    }).populate("productID");

    return { status: "success", data: data };

  } catch (error) {
    throw new Error(error.message);  
  }
};

export const updateCartService = async (req) => {
try {
if (!req.user || !req.user._id) {
throw new Error("Not authorized, user not found");
}
const user_id = req.user._id;
const { id } = req.params;
const { qty } = req.body;
const data = await CartModel.updateOne(
{ _id: new ObjectId(id), userID: new ObjectId(user_id) },
{ $set: { qty } }
);
return { status: "success", data: data };
} catch (error) {
throw new Error(error.message);
}
};

export const deleteCartService = async (req) => {
try {
if (!req.user || !req.user._id) {
throw new Error("Not authorized, user not found");
}
const user_id = req.user._id;
const { id } = req.params;
const data = await CartModel.deleteOne({
_id: new ObjectId(id),
userID: new ObjectId(user_id),
});
return { status: "success", data: data };
} catch (error) {
throw new Error(error.message);
}
};