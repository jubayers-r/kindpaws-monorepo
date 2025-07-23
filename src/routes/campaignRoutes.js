import express from "express";
import Campaign from "../models/Campaign.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (err) {
    console.error("Failed to fetch campaigns:", err.message);
    res.status(500).json({ message: "Server Error: Unable to fetch campaigns" });
  }
});

export default router;
