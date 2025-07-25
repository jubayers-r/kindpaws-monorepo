import express from "express";
import Pet from "../models/Pet.js";
import { error, notFound, success } from "../utils/responseUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteById, toggleBooleanField } from "../utils/dbHelpers.js";

const router = express.Router();

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

export default router;
