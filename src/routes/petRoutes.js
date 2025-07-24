import express from "express";
import Pet from "../models/Pet.js";
import { error, notFound, success } from "../utils/responseUtils.js";

export const router = express.Router();

// get all pets
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

// put by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const petData = req.body;

    const pet = await Pet.findByIdAndUpdate(id, petData, {new: true});
    if (!pet) {
      return notFound(res, "Pet");
    }
    success(res, pet);
  } catch (err) {
    error(res, err);
  }
});

// pet adoption status toggle by admin
router.patch("/statusToggle", async (req, res) => {
  try {
    const id = req.query.id;

    const toggle = await Pet.findOneAndUpdate(
      { _id: id },
      [{ $set: { isAdopted: { $not: "$isAdopted" } } }],
      { new: true }
    );
    if (!toggle) {
      return notFound(res, "Pet");
    }
    success(res, toggle);
  } catch (err) {
    error(res, err);
  }
});

// pet delete
router.delete("/delete", async (req, res) => {
  try {
    const petId = req.query.id;

    const deletePet = await Pet.findByIdAndDelete(petId);
    if (!deletePet) {
      return notFound(res, "Pet");
    }
    success(res, deletePet);
  } catch (err) {
    error(res, err);
  }
});

// add a pet
router.post("/add-pet", async (req, res) => {
  try {
    const userId = req.query.uid;
    const petData = req.body;
    const pet = await Pet.create({ ...petData, uid: userId });
    if (!pet) {
      return notFound(res, "Pet");
    }
    success(res, pet);
  } catch (err) {
    error(res, err);
  }
});

export default router;
