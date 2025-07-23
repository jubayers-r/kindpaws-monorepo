import express from "express";
import Pet from "../models/Pet.js";


export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    console.error("Failed to fetch pets:", err.message);
    res.status(500).json({ message: "Server Error: Unable to fetch pets" });
  }
});

export default router;
