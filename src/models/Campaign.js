import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const campaignSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  shortDescription: { type: String },
  longDescription: { type: String },
  goalAmount: { type: Number, required: true },
  collectedAmount: { type: Number, default: 0 },
  location: { type: String },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isFeatured: { type: Boolean, default: false },
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
  updates: [updateSchema],
  isOpen: { type: Boolean, default: true },
});

export default mongoose.model("Campaign", campaignSchema);
