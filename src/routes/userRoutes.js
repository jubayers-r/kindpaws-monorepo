import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


export default router;