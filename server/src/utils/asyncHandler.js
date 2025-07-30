import { error } from "./responseUtils.js";

export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    error(res, err); // or next(err) if you use centralized error middleware
  }
};