import { notFound, success } from "./responseUtils.js";

export const toggleBooleanField = async ({
  model,
  id,
  res,
  field = "isAdopted",
  resourceName = "Item"
}) => {
  const updatedDoc = await model.findOneAndUpdate(
    { _id: id },
    [{ $set: { [field]: { $not: `$${field}` } } }],
    { new: true }
  );
  if (!updatedDoc) {
    return notFound(res, resourceName);
  }
  return success(res, updatedDoc);
};

export const deleteById = async ({ model, id, res, resourceName = "Item" }) => {
  const deletedDoc = await model.findByIdAndDelete(id);
  if (!deletedDoc) {
    return notFound(res, resourceName);
  }
  return success(res, deletedDoc);
};


// router.post("/add-pet", async (req, res) => {
//   try {
//     const userId = req.query.uid;
//     const petData = req.body;
//     const pet = await Pet.create({ ...petData, uid: userId });
//     if (!pet) {
//       return notFound(res, "Pet");
//     }
//     success(res, pet);
//   } catch (err) {
//     error(res, err);
//   }
// });
