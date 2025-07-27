import express from "express";
import Pet from "../models/Pet.js";
import { error, notFound, success } from "../utils/responseUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteById, toggleBooleanField } from "../utils/dbHelpers.js";
import AdoptionRequest from "../models/AdoptionRequest.js";
import User from "../models/User.js";

const router = express.Router();

// find pet adoption requests
router.patch(
  "/adoption-requests",
  asyncHandler(async (req, res) => {
    const adoptionRequestId = req.query.id;
    const { status } = req.body;

    // 1. Update the adoption request
    const request1 = await AdoptionRequest.findByIdAndUpdate(
      adoptionRequestId,
      { status },
      { new: true }
    );

    if (!request1) {
      return notFound(res, "Adoption request");
    }

    // 2. Update the pet using the petId from the adoption request
    const request2 = await Pet.findByIdAndUpdate(
      request1.petId,
      {
        isAdopted: status === "Approved" ? true : false,
      },
      { new: true }
    );

    if (!request2) {
      return notFound(res, "Pet");
    }

    // 3. Send back success
    success(res, request1);
  })
);
// get all adoption requests
router.get(
  "/adoption-requests",
  asyncHandler(async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query param is required." });
    }

    const user = await User.findOne({ uid: userId });

    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ If admin, show all adoption requests
    if (user.role === "admin") {
      const allRequests = await AdoptionRequest.find();
      return res.json(allRequests);
    } else {
      const requests = await AdoptionRequest.find()
        .populate({
          path: "petId",
          select: "ownerId", // add any pet fields you need
        })
        .lean();

      // Filter only those requests where pet.ownerId === userId
      const filteredRequests = requests.filter(
        (request) => request.petId?.ownerId === userId
      );

      if (!filteredRequests.length) {
        return res
          .status(404)
          .json({ message: "No adoption requests found for this user." });
      }

      return res.status(200).json(filteredRequests);
    }
  })
);

// get all pets (make it resusable)
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    if (!pets) {
      return notFound(res, "Pets");
    }
    success(res, pets);
  } catch (err) {
    console.error("Failed to fetch pets:", err.message);
    res.status(500).json({ message: "Server Error: Unable to fetch pets" });
  }
});

// get pet by id

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const petData = await Pet.findById(id);
    if (!petData) {
      return notFound(res, "Pet");
    }
    success(res, petData);
  } catch (err) {
    error(res, err);
  }
});

// put by id (make it resusable)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const petData = req.body;

    const pet = await Pet.findByIdAndUpdate(id, petData, { new: true });
    if (!pet) {
      return notFound(res, "Pet");
    }
    success(res, pet);
  } catch (err) {
    error(res, err);
  }
});

// pet adoption status toggle by admin (from dbHelper)
router.patch(
  "/statusToggle",
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    toggleBooleanField({ model: Pet, id, res, resourceName: "Pet" });
  })
);

// pet delete (from dbHelper)
router.delete(
  "/delete",
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    deleteById({ model: Pet, id, res, resourceName: "Pet" });
  })
);

// add a pet
router.post("/add-pet", async (req, res) => {
  try {
    const petData = req.body;
    const pet = await Pet.create({ ...petData });
    if (!pet) {
      return notFound(res, "Pet");
    }
    success(res, pet);
  } catch (err) {
    error(res, err);
  }
});

// pet adotion request
router.post(
  "/:id/adoption-request",
  asyncHandler(async (req, res) => {
    const petId = req.params.id;
    const data = req.body;
    const adoptionReq = await AdoptionRequest.create({ ...data, petId: petId });

    if (!adoptionReq) {
      return notFound(res, "Adoption Request");
    }
    success(res, adoptionReq);
  })
);

export default router;
