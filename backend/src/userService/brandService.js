import BrandModel from "../model/BrandModel.js";
import CategoryModel from "../model/CategoryModel.js";
import ProductModel from "../model/ProductModel.js";

export const createBrandService = async (reqBody) => {
  try {
    const result = await BrandModel.create(reqBody);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", error: error.message };
  }
};

export const getBrandService=async()=>{

try {
    const result = await BrandModel.find();
    return { status: "success", data: result };

} catch (error) {
    return { status: "fail", error: error.message };
}


}

export const updateBrandService = async (id, reqBody) => {
  try {
    const result = await BrandModel.findByIdAndUpdate(id, reqBody);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", error: error.message };
  }
};

export const deleteBrandService = async (id) => {
  try {
    const result = await BrandModel.findByIdAndDelete(id);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", error: error.message };
  }
};


export const createCategoryService = async(reqBody)=>{

try {
    const result = await CategoryModel.create(reqBody);
    return { status: "success", data: result };
} catch (error) {
    return { status: "fail", error: error.message };
}



}

export const getCategoryService=async()=>{

try {
    const result = await CategoryModel.find();
    return { status: "success", data: result };

} catch (error) {
    return { status: "fail", error: error.message };
}
}

export const updateCategoryService = async (id, reqBody) => {
    try {
      const result = await CategoryModel.findByIdAndUpdate(id, reqBody);
      return { status: "success", data: result };
    } catch (error) {
      return { status: "fail", error: error.message };
    }
  };

  export const deleteCategoryService = async (id) => {
    try {
      const result = await CategoryModel.findByIdAndDelete(id);
      return { status: "success", data: result };
    } catch (error) {
      return { status: "fail", error: error.message };
    }
  };

  export const createProductService = async (reqBody) => {
    try {
      const result = await ProductModel.create(reqBody);
      return { status: "success", data: result };
    } catch (error) {
      return { status: "fail", error: error.message };
    }
  }

export const getProductService = async () => {
    try {
      const result = await ProductModel.find();
      return { status: "success", data: result };
    } catch (error) {
      return { status: "fail", error: error.message };
    }
  };

  export const updateProductService = async (id, reqBody) => {
    try {
      const result = await ProductModel.findByIdAndUpdate(id, reqBody);
      return { status: "success", data: result };
    } catch (error) {
      return { status: "fail", error: error.message };
    }
  };

  export const deleteProductService = async (id) => {
    try {
      const result = await ProductModel.findByIdAndDelete(id);
      return { status: "success", data: result };
    } catch (error) {
      return { status: "fail", error: error.message };
    }
  };

