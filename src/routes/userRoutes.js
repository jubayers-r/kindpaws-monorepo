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
router.patch("/last-login/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findOneAndUpdate(
      { uid: userId },
      { lastLoginAt: new Date() },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/role", async (req, res) => {
  try {
    const userId = req.query.uid;
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
