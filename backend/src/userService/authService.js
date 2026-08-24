import bcrypt from "bcryptjs";
import UserModel from "../model/UserModel.js";
import generateToken from "../utilitis/generateToken.js";
import {sendEmail} from "../utilitis/Email/email.js";



export const sendOtpService = async (reqBody) => {
  try {
    const { name, email, password } = reqBody;

    // চেক করা ইমেইল দিয়ে আগে কোনো ইউজার আছে কিনা
    const existingUser = await UserModel.findOne({ email });

    // যদি ইউজার থাকে এবং তার অ্যাকাউন্ট ইতিমধ্যে ভেরিফাইড (completed) করা থাকে
    if (existingUser && existingUser.isVerified === true) {
      return { status: "fail", message: "User already exists and is verified!" };
    }

    // পাসওয়ার্ড হ্যাশ করে নেওয়া
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ৬ ডিজিটের ওটিপি এবং ৩০ মিনিটের মেয়াদ তৈরি
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 30 * 60 * 1000);

    let text = `Your OTP for registration is ${otp}`;
    let subject = "OTP Verification";
    await sendEmail(email, subject, text);

    // ওটিপিসহ সাময়িকভাবে ইউজার ডাটাবেজে সেভ বা আপডেট করে রাখা (isVerified বাই ডিফল্ট false থাকবে)
    await UserModel.findOneAndUpdate(
      { email },
      { 
        name, 
        email, 
        password: hashedPassword, 
        otp, 
        otpExpiry,
        isVerified: false // নিশ্চিত করা যে অ্যাকাউন্টটি এখনো ভেরিফাই হয়নি
      },
      { upsert: true, new: true }
    );

    return { 
      status: "success", 
      message: "OTP sent to your email successfully. Please verify." 
    };

  } catch (error) {
    return { status: "fail", error: error.message };
  }
};;





export const registerUser = async (reqBody) => {
   try {
    const { email, otp } = reqBody;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return { status: "fail", message: "User not found!" };
    }

    // ওটিপি মিলছে কিনা এবং মেয়াদ শেষ হয়ে গেছে কিনা চেক করা
    if (user.otp !== otp) {
      return { status: "fail", message: "Invalid OTP!" };
    }

    if (user.otpExpiry < Date.now()) {
      return { status: "fail", message: "OTP has expired!" };
    }

    // ভেরিফিকেশন সফল হলে ডাটাবেজ থেকে ওটিপি এবং এর মেয়াদ মুছে ফেলা
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // সিকিউর টোকেন জেনারেট করা
    const token = generateToken(user._id, user.role);

    return {
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    };

  } catch (error) {
    return { status: "fail", error: error.message };
  }


}


export const loginService = async (reqBody) => {
try {
   const {email, password}= reqBody;
   const user= await UserModel.findOne({email});
   if(!user) {
       return { status: "fail", error: "Invalid email or password" };
   } 

   const isMatch= await bcrypt.compare(password,user.password)
   if(!isMatch){
    return { status: "fail", error: "Invalid email or password not match" };
   }
const token = generateToken(user._id, user.role);
return {
status: "success",
data: {
_id: user._id,
name: user.name,
email: user.email,
role: user.role,
token,

},
};
} catch (error) {
return { status: "fail", error: error.message };
}
};