

import FeaturesModel from "../../model/FeaturesModel.js";




export const addFeature = async (data) => {
 try {
    const result = await FeaturesModel.create(data);
    return { status: "success", data: result };
 } catch (error) {
    return { status: "fail", error: error.message };
 }
};