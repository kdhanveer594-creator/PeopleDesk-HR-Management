import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const port = Number(process.env.PORT || 5000);

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required.");
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 || process.env.JWT_SECRET.startsWith("replace-")) {
  throw new Error("JWT_SECRET must be set to a random secret with at least 32 characters.");
}

try {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`PeopleDesk API listening on port ${port}`));
} catch (error) {
  console.error("Could not connect to MongoDB:", error.message);
  process.exitCode = 1;
}
