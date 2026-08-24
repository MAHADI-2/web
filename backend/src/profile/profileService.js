import ProfileModel from "../model/ProfileModel.js";



export const profileService = async (req)=>{
const user_id= req.user._id
const body = req.body
try {


const data = await ProfileModel.create({...body, userID:user_id});

return {status:"success", data:data};


} catch (error) {
  
return {status:"fail", error:error.message};

}



}