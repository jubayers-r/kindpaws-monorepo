import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  phone: String,
  address: String,
});

export default mongoose.model("Donation", donationSchema);
