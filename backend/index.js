import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
