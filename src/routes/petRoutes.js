import express from "express";
import Pet from "../models/Pet.js";
import { error, notFound, success } from "../utils/responseUtils.js";

export const router = express.Router();


// get all users
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    console.error("Failed to fetch pets:", err.message);
    res.status(500).json({ message: "Server Error: Unable to fetch pets" });
  }
});

// pet adoption status toggle by admin
router.patch("/statusToggle", async (req, res) => {
  try {
    const id = req.query.id;

    const toggle = await Pet.findOneAndUpdate(
      { _id: id },
      [{ $set: { isAdopted: { $not: "$isAdopted" } } }],
      { new: true }
    );
    if (!toggle) {
      return notFound(res, "Pet");
    }
    success(res, toggle);
  } catch (err) {
    error(res, err);
  }
});

// pet delete
router.delete("/delete", async (req, res) => {
  try {
    const petId = req.query.id;

    const deletePet = await Pet.findByIdAndDelete(petId);
    if (!deletePet) {
      return notFound(res, "Pet");
    }
    success(res, deletePet);
  } catch (err) {
    error(res, err);
  }
});



export default router;
