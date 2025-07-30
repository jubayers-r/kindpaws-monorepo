import express from "express";
import Campaign from "../models/Campaign.js";
import { error, success } from "../utils/responseUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteById, toggleBooleanField } from "../utils/dbHelpers.js";
import Stripe from "stripe";
import Donation from "../models/Donation.js";

export const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @route GET /api/donations/my
// @desc Get logged-in user's donations
// @access Private
router.get("/my", async (req, res) => {
  const { id: uid } = req.query;

  const donations = await Donation.find({ donorId: uid }).sort({
    createdAt: -1,
  });

  res.json(donations);
});

router.patch("/refund/:id", async (req, res) => {
  const donation = await Donation.findById(req.params.id);

  if (!donation) return res.status(404).json({ message: "Donation not found" });
  if (donation.isRefunded)
    return res.status(400).json({ message: "Already refunded" });

  try {
    // 1. (Optional) Stripe Refund
    if (donation.paymentIntentId) {
      await stripe.refunds.create({
        payment_intent: donation.paymentIntentId,
      });
    }

    // 2. Update in DB
    donation.isRefunded = true;
    await donation.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Refund failed" });
  }
});

// get all campaigns (make it resusable)
router.get("/", async (req, res) => {
  try {
    const { limit, excludeId } = req.query;

    const query = {
      $expr: { $lt: ["$collectedAmount", "$goalAmount"] },
    };

    // Exclude current campaign if excludeId is provided
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    let campaignsQuery = Campaign.find(query).sort({ createdAt: -1 });

    // Apply limit if provided
    if (limit) {
      campaignsQuery = campaignsQuery.limit(parseInt(limit));
    }

    const campaigns = await campaignsQuery;

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

// stripe

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: "usd",
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

router.post("/donations", async (req, res) => {
  const { amount, campaignId, donorId, paymentId } = req.body;

  try {
    // 🔥 You forgot this line!
    const campaign = await Campaign.findById(campaignId).lean();

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const donation = await Donation.create({
      amount,
      campaignId,
      donorId,
      paymentId,
      campaignSnapshot: {
        title: campaign.title,
        image: campaign.image,
        petName: campaign.petName, // Optional: only if your schema has this
      },
    });

    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { raisedAmount: amount },
    });

    res.status(201).json({ message: "Donation saved." });
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
