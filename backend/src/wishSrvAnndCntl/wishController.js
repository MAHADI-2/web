import {
addWishService,
getWishService,
updateWishService,
deleteWishService,
} from "../wishSrvAnndCntl/wishService.js";
export const addWish = async (req, res) => {
try {
const result = await addWishService(req);
res.status(200).json(result);
} catch (error) {
res.status(500).json({ message: error.message });
}
};




export const getWish = async (req, res) => {
try {
const result = await getWishService(req);
res.status(200).json(result);
} catch (error) {
res.status(500).json({ message: error.message });
}
};



export const updateWish = async (req, res) => {
try {
const result = await updateWishService(req);
res.status(200).json(result);
} catch (error) {
res.status(500).json({ message: error.message });
}
};
export const deleteWish = async (req, res) => {
try {
const result = await deleteWishService(req);
res.status(200).json(result);
} catch (error) {
res.status(500).json({ message: error.message });
}
};