import express from "express";
import admin from "firebase-admin";
import serviceAccount from "../firebaseServiceAccount.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const router = express.Router();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// issue jwt
router.post(
  "/jwt",
  asyncHandler(async (req, res) => {
    const { firebaseToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const token = jwt.sign(
      { uid: decoded.uid, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "JWT issued" });
  })
);

// middleware

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded;
    next();
  });
};

router.get(
  "/protected",
  verifyJWT,
  asyncHandler(async (req, res) => {
    res.json({ message: "Access granted", user: req.user });
  })
);

export default router;
