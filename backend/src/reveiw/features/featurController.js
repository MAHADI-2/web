import {addFeature} from "../features/featureService.js";

export const createFeature = async (req, res) => {
        try {
            const result = await addFeature(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };


