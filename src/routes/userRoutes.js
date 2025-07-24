import express from "express";
import User from "../models/User.js";
import { error, notFound, success } from "../utils/responseUtils.js";

const router = express.Router();

// fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    success(res, users);
  } catch (err) {
    error(res, err);
  }
});

// fetch role
router.get("/role", async (req, res) => {
  try {
    const userId = req.query.uid;
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return notFound(res, "User");
    }
    success(res, user);
  } catch (err) {
    error(res, err);
  }
});

// register
router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// log last login
router.patch("/last-login/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findOneAndUpdate(
      { uid: userId },
      { lastLoginAt: new Date() },
      { new: true }
    );
    if (!updatedUser) {
      return notFound(res, "User");
    }
    success(res, updatedUser);
  } catch (err) {
    error(res, err);
  }
});

// ban/make admin
router.patch("/:action", async (req, res) => {
  try {
    const action = req.params.action;
    const userId = req.query.uid;
    let userUpdate;
    if (action === "promote") {
      userUpdate = await User.findOneAndUpdate(
        { uid: userId },
        { role: "admin" },
        { new: true }
      );
    } else if (action === "demote") {
      userUpdate = await User.findOneAndUpdate(
        { uid: userId },
        { role: "user" },
        { new: true }
      );
    } else if (action === "ban") {
      userUpdate = await User.findOneAndUpdate(
        { uid: userId },
        { banned: true },
        { new: true }
      );
    } else if (action === "unban") {
      userUpdate = await User.findOneAndUpdate(
        { uid: userId },
        { banned: false },
        { new: true }
      );
    } else {
      return res.status(400).json({ error: "Invalid Action" });
    }
    if (!userUpdate) {
      return notFound(res, "User");
    }
    success(res, userUpdate);
  } catch (err) {
    error(res, err);
  }
});

export default router;
