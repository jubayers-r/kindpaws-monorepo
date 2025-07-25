import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
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
    isFeatured: { type: Boolean, default: false },
    isAdopted: { type: Boolean, required: true, default: false },

    ownerId: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    ownerPhoto: {
      type: String,
      required: true,
    },

    // 🔗 Reference multiple adoption requests
    adoptionRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdoptionRequest",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);
