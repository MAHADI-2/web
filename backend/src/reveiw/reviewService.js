import ReviewModel from "../model/ReviewModel.js";
import mongoose from "mongoose";
let ObjectId = mongoose.Types.ObjectId;
export const addReviewService = async (req) => {
try {
const user_id = req.user._id;
const { productID, rating, des } = req.body;
const review = await ReviewModel.create({
userID: new ObjectId(user_id),
productID: new ObjectId(productID),
rating,
des,
});
return { status: "success", data: review };
} catch (error) {
return { status: "fail", message: error.message };
}
};

export const getReviewsByProductService = async (req) => {
try {
const { productID } = req.params;
const reviews = await ReviewModel.find({ productID })
.populate("userID", "name")
.sort({ createdAt: -1 });
return { status: "success", data: reviews };
} catch (error) {
return { status: "fail", message: error.message };
}
};
