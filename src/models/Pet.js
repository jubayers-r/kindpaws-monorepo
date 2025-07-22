import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  image: String,
  name: String,
  age: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Unknown"],
  },
  location: String,
  category: {
    type: String,
    enum: ["Dog", "Cat", "Bird", "Other"],
  },
  shortDescription: String,
  longDescription: String,
  tags: [String],
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  isFeatured: Boolean,
  isAdopted: Boolean,

  // 🔗 Reference the owner
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // 🔗 Reference multiple adoption requests
  adoptionRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdoptionRequest",
    },
  ],
});

export default mongoose.model("Pet", petSchema);