import mongoose from "mongoose";

const adoptionRequestSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
       ref: "Pet",
      required: true,
    },
    userId: String,
    phone: String,
    address: String,
    userName: String,
    userEmail: String,
    petName: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdoptionRequest", adoptionRequestSchema);
