import mongoose from "mongoose";

const adoptionRequestSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    default: "Pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AdoptionRequest", adoptionRequestSchema);