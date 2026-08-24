

import {addReviewService, getReviewsByProductService} from "./reviewService.js";



export const addReview = async (req, res) => {
    try {
        const result = await addReviewService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getReviewsByProduct = async (req, res) => {
    try {
        const result = await getReviewsByProductService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};