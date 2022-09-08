import * as dotenv from "dotenv";
import path from "path";
import express, { json } from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { fileFilter, fileStorage } from "./services/file";
import { houseRoutes } from "./routes/house";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(json());
app.use(cookieParser());

// File uploads
app.use(multer({ storage: fileStorage }).single("image"));

// Files folder
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "../", "public", "uploads"))
);

app.use(
  cors({
    origin: "*",
  })
);

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/house", houseRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.all("*", (req, res, next) => {
  next(new NotFoundError("Route not found!"));
});
app.use(errorHandler);

export { app };
