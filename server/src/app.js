import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import hrRoutes from "./routes/hr.js";
import employeePortalRoutes from "./routes/employeePortal.js";
import operationsRoutes from "./routes/operations.js";
import { requireAuth, requireRole } from "./middleware/auth.js";
import { auditChanges } from "./middleware/audit.js";
import { errorHandler, notFound } from "./middleware/errors.js";

const app = express();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, "../..");

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim()) : "http://localhost:5173",
}));
app.use(express.json({ limit: "100kb" }));
app.get("/api/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  return res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "unavailable",
    database: connected ? "connected" : "disconnected",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/operations", requireAuth, auditChanges, operationsRoutes);
app.use("/api/employee-portal", requireAuth, requireRole("employee"), auditChanges, employeePortalRoutes);
app.use("/api", requireAuth, requireRole("admin", "hr"), auditChanges, hrRoutes);

const productionAssets = path.join(projectRoot, "dist");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(productionAssets));
  app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    return res.sendFile(path.join(productionAssets, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
