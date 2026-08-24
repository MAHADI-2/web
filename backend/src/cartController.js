import {cartService,readCartService,updateCartService,deleteCartService} from "../src/CartService.js";

export const addCart = async (req, res) => {
    try {
        const result = await cartService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const cartRead=async(req,res)=> {

try {
    const result= await readCartService(req)
    res.status(200).json(result)
} catch (error) {
    res.status(500).json({ message: error.message });
}



}



export const updateCart = async (req, res) => {
    try {
        const result = await updateCartService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCart = async (req, res) => {
    try {
        const result = await deleteCartService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};