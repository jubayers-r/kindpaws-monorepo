import express from "express";
import Campaign from "../models/Campaign.js";
import { success } from "../utils/responseUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteById, toggleBooleanField } from "../utils/dbHelpers.js";

export const router = express.Router();

// get all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    success(res, campaigns);
  } catch (err) {
    console.error("Failed to fetch campaigns:", err.message);
    res
      .status(500)
      .json({ message: "Server Error: Unable to fetch campaigns" });
  }
});

// campaign adoption status toggle by admin (from dbHelper)
router.patch(
  "/statusToggle",
  asyncHandler(async (req, res) => {
    const id = req.query.id;

    toggleBooleanField({
      model: Campaign,
      id,
      res,
      field: "isOpen",
      resourceName: "Campaign",
    });
  })
);

// campaign delete (from dbHelper)
router.delete(
  "/delete",
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    deleteById({ model: Campaign, id, res, resourceName: "Campaign" });
  })
);

export default router;
