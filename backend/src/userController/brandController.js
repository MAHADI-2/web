import {createBrandService ,getBrandService,deleteBrandService,
    createCategoryService,updateCategoryService,
    getCategoryService,updateBrandService,deleteCategoryService,
    createProductService,getProductService,updateProductService,deleteProductService}from "../userService/brandService.js";


export const createBrand = async (req, res) => {
        try {
            const result = await createBrandService(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    export const getBrand = async (req, res) => {
        try {
            const result = await getBrandService();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

export const updateBrand = async (req, res) => {
    try {
        const result = await updateBrandService(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




    export const deleteBrand = async (req, res) => {
        try {
            const result = await deleteBrandService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


    export const createCategory = async (req, res) => {
        try {
            const result = await createCategoryService(req.body);
            res.status(200).json({ message: "Category created successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

export const getCategory = async (req, res) => {
    try {
        const result = await getCategoryService();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const result = await updateCategoryService(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const result = await deleteCategoryService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createProduct = async (req, res) => {
    try {
        const result = await createProductService(req.body);
        res.status(200).json({ message: "Product created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const result = await getProductService();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const result = await updateProductService(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const  deleteProduct = async (req, res) => {
    try {
        const result = await deleteProductService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};