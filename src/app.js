import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/campaigns", campaignRoutes);

// fallback
app.use(/.*/, (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

export { app };
