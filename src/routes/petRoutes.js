import { router } from "../constants.js";
import Pet from "../models/Pet.js";

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    console.error("Failed to fetch pets:", err.message);
    res.status(500).json({ message: "Server Error: Unable to fetch pets" });
  }
});

export default router;
