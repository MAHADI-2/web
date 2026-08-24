import ProductModel from "../model/productModel.js";

export const getProductService=async()=>{
try {
    const result = await ProductModel.find();
    return { status: "success", data: result }

} catch (error) {
    return { status: "fail", error: error.message }
}
}