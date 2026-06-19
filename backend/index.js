import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./routes/AuthRoutes.js";
import bookRoutes from "./routes/BookRoutes.js";
import borrowRoutes from "./routes/BorrowRoutes.js";
import dashboardRoutes from "./routes/DashboardRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/api/auth", AuthRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/dashboard", dashboardRoutes);
mongoose
  .connect(process.env.MONGO_DB, {
    dbName: "smart_library",
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`Server listens on ${PORT}`);
});
