import {getProductService} from "../userService/brandService.js";

export const getProduct = async (req, res) => {
    try {
        const result = await getProductService();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};