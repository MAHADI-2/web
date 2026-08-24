import {productDetailsService,getProductDetailsService} from "./productDetailsService.js";





export const productDetails=async(req,res)=>{


try {
    const result= await productDetailsService(req.body)
    res.status(200).json(result)
} catch (error) {
    res.status(500).json({ message: error.message });
}




}

export const getProductDetails=async(req,res)=>{


    try {
        const result= await getProductDetailsService(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    
    }