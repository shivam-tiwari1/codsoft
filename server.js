import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";

const app = express();
app.use(cors());
app.use(express.json());

// DB
connectDB();

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

app.listen(5000, () => console.log("Server running on 5000"));
