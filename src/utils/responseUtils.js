export const success = (res, data) => res.status(200).json(data);
export const error = (res, err) => res.status(500).json({ message: err.message });
export const notFound = (res, resource = "Resource") =>
  res.status(404).json({ message: `${resource} not found` });