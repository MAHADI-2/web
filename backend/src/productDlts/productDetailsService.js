import ProductDetailsModel from "../model/ProductDetailsModel.js";


export const productDetailsService = async(reqbody)=>{
const reqBody = reqbody
    try {
    const data = await ProductDetailsModel.create(reqBody);
    return { status: "success", data: data };
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getProductDetailsService = async()=>{
    try {
    const data = await ProductDetailsModel.find();
    return { status: "success", data: data };
  } catch (error) {
    throw new Error(error.message);
  }
};