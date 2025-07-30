import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    donorId: {
      type: String,
      required: true,
    },
    amount: { type: Number, required: true },
    phone: String,
    address: String,

    // ✅ Stripe payment intent ID (for real refund)
    paymentIntentId: { type: String },

    // ✅ Is refunded or not
    isRefunded: { type: Boolean, default: false },

    // ✅ Store campaign info at the time of donation (denormalized)
    campaignSnapshot: {
      title: String,
      image: String,
      petName: String,
    },
    paymentId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
