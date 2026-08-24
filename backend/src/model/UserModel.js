import mongoose from "mongoose";
const DataSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true, unique: true, lowercase: true },
password: { type: String, required: true },
role: { type: String, enum: ["user", "admin"], default: "user" },
otp: { type: String },
otpExpiry: { type: Date },
isVerified: { type: Boolean, default: false },
},
{
timestamps: true,
versionKey: false,
}
);
const UserModel = mongoose.model("users", DataSchema);
export default UserModel;