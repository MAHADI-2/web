import {profileService} from "./profileService.js";




export const createProfile = async (req, res) => {
    try {
        const result = await profileService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};