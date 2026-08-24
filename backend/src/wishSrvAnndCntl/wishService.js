import WishModel from "../model/WishModel.js";
import mongoose from "mongoose";
let ObjectId = mongoose.Types.ObjectId;
export const addWishService = async (req) => {
try {
const user_id = req.user._id;
const { productID } = req.body;
const wish = await WishModel.create({
userID: new ObjectId(user_id),
productID: new ObjectId(productID),
});
return { status: "success", data: wish };
} catch (error) {
throw new Error(error.message);
}
};
export const getWishService = async (req) => {
try {
const user_id = req.user._id;
const wish = await WishModel.find({ userID: user_id }).populate("productID");
return { status: "success", data: wish };
} catch (error) {
throw new Error(error.message);
}
};
export const updateWishService = async (req) => {
try {
const user_id = req.user._id;
const { productID } = req.body;
const wish = await WishModel.findOneAndUpdate(
{ userID: new ObjectId(user_id), productID: new ObjectId(productID) },
{ $set: { userID: user_id, productID: new ObjectId(productID) } },
{ new: true }
);
return { status: "success", data: wish };
} catch (error) {
throw new Error(error.message);
}
};
export const deleteWishService = async (req) => {
try {
const { id } = req.params;
const result = await WishModel.deleteOne({ _id: id });
return { status: "success", data: result };
} catch (error) {
throw new Error(error.message);
}
};
