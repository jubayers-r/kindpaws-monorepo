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

// export router.delete("/delete", async (req, res) => {
//   try {
//     const petId = req.query.id;

//     const deletePet = await Pet.findByIdAndDelete(petId);
//     if (!deletePet) {
//       return notFound(res, "Pet");
//     }
//     success(res, deletePet);
//   } catch (err) {
//     error(res, err);
//   }
// });
