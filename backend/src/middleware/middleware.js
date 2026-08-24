import jwt from "jsonwebtoken";
import config from "../config.js";
import UserModel from "../model/UserModel.js";


// Verify JWT and attach user to request
export const  protect = async (req, res, next) => {
    
let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

try {
    token= req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user= await UserModel.findById(decoded.id).select("-password")
    if(!req.user){
        return res.status(401).json({message:"User not found"});
    }
    next();
    
    
} catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
}


}else{
    return res.status(401).json({ message: "Not authorized, no token" });
}
    


}



// Restrict route to admin only

export const admin = (req, res, next) => {
    if(req.user && req.user.role==="admin"){
        next();
    }else{
        return res.status(401).json({ message: "Not authorized as admin" });
    }
}