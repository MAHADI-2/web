import jwt from "jsonwebtoken"
import config from "../config.js";



const  generateToken=  (id, role) =>{
return jwt.sign({id, role}, config.JWT_SECRET,{

expiresIn:config.JWT_EXPIRES_IN || "30d"

});



};


export default generateToken;