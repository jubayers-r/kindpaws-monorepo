import express from "express";
import Campaign from "../models/Campaign.js";
import { error, success } from "../utils/responseUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteById, toggleBooleanField } from "../utils/dbHelpers.js";
import Stripe from "stripe";

export const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// get all campaigns (make it resusable)
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

// (make it resusable)
router.post("/add-campaign", async (req, res) => {
  try {
    const campaignData = req.body;
    const campaign = await Campaign.create({ ...campaignData });
    if (!campaign) {
      return notFound(res, "Campaign");
    }
    success(res, campaign);
  } catch (err) {
    error(res, err);
  }
});
// (make it resusable)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const campaignData = req.body;

    const campaign = await Campaign.findByIdAndUpdate(id, campaignData, {
      new: true,
    });
    if (!campaign) {
      return notFound(res, "Campaign");
    }
    success(res, campaign);
  } catch (err) {
    error(res, err);
  }
});

// get campain by id (make it resusable)

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const CampaignData = await Campaign.findById(id);
    if (!CampaignData) {
      return notFound(res, "Campaign");
    }
    success(res, CampaignData);
  } catch (err) {
    error(res, err);
  }
});

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: "usd",
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

export default router;
