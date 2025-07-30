import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
     banned: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
