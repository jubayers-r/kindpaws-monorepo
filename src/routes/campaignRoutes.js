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
// router.get("/my", async (req, res) => {
//   try {
//     const userId = req.query.id;

//     console.log(userId);

//     const donations = await Donation.find({ donorId: userId })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "campaignId",
//         select: "title image petName",
//       })
//       .lean();

//     const enriched = donations.map((donation) => ({
//       _id: donation._id,
//       amount: donation.amount,
//       isRefunded: donation.isRefunded || false,
//       createdAt: donation.createdAt,
//       campaignSnapshot: {
//         title: donation.campaignId?.title || "[Deleted]",
//         petName: donation.campaignId?.petName || "[Unknown Pet]",
//         image: donation.campaignId?.image || "https://via.placeholder.com/150",
//       },
//     }));

//     res.json(enriched);
//   } catch (err) {
//     console.error("[MyDonations] Error:", err);
//     res.status(500).json({ error: "Failed to fetch donation history." });
//   }
// });

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

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: "usd",
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

// @route DELETE /api/donations/:id
// @desc Refund (delete) a donation by ID
// @access Private
// router.delete("/:id", async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);

//     if (!donation)
//       return res.status(404).json({ error: "Donation not found." });
//     if (donation.donorId.toString() !== req.user.id)
//       return res.status(403).json({ error: "Unauthorized action." });

//     // OPTIONAL: mark as refunded instead of deleting
//     // donation.isRefunded = true;
//     // await donation.save();
//     await donation.deleteOne();

//     res.json({ message: "Donation refunded." });
//   } catch (err) {
//     console.error("[RefundDonation] Error:", err);
//     res.status(500).json({ error: "Failed to process refund." });
//   }
// });

export default router;
