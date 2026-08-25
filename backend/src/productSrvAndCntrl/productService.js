import ProductModel from "../model/ProductModel.js";
import ReviewModel from "../model/ReviewModel.js";

export const getProductService=async()=>{
try {
        const [products, ratings] = await Promise.all([
            ProductModel.find().populate("categoryID", "categoryName"),
            ReviewModel.aggregate([
                {
                    $group: {
                        _id: "$productID",
                        rating: { $avg: "$rating" },
                        reviewCount: { $sum: 1 },
                    },
                },
            ]),
        ]);
        const ratingMap = new Map(ratings.map((item) => [String(item._id), item]));
        const result = products.map((product) => ({
            ...product.toObject(),
            rating: ratingMap.get(String(product._id))?.rating || 0,
            reviewCount: ratingMap.get(String(product._id))?.reviewCount || 0,
        }));
    return { status: "success", data: result }

} catch (error) {
    return { status: "fail", error: error.message }
}
}