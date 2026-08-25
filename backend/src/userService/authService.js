import bcrypt from "bcryptjs";
import UserModel from "../model/UserModel.js";
import generateToken from "../utilitis/generateToken.js";
import { sendEmail } from "../utilitis/Email/email.js";

export const sendOtpService = async (reqBody) => {
  try {
    const { name, email, password } = reqBody;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser && existingUser.isVerified === true) {
      return { status: "fail", message: "User already exists and is verified!" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 30 * 60 * 1000);
    let text = `Your OTP for registration is ${otp}`;
    let subject = "OTP Verification";
    await sendEmail(email, subject, text);

    await UserModel.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        isVerified: false
      },
      { upsert: true, new: true }
    );

    return {
      status: "success",
      message: "OTP sent to your email successfully. Please verify."
    };
  } catch (error) {
    console.error("sendOtpService error:", error);
    return { status: "fail", error: error.message };
  }
};

export const registerUser = async (reqBody) => {
  try {
    const { email, otp } = reqBody;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { status: "fail", message: "User not found!" };
    }

    if (user.otp !== otp) {
      return { status: "fail", message: "Invalid OTP!" };
    }

    if (user.otpExpiry < Date.now()) {
      return { status: "fail", message: "OTP has expired!" };
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    user.isVerified = true;
    await user.save();

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

export const loginService = async (reqBody) => {
  try {
    const { email, password } = reqBody;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { status: "fail", error: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
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