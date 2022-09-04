import express, { json } from "express";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { houseRoutes } from "./routes/house";
import { authRoutes } from "./routes/auth";

const app = express();

app.use(json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["rvefdvre", "fewdsvgewr"],
  })
);

app.use("/api/v1/house", houseRoutes);
app.use("/api/v1/auth", authRoutes);
app.all("*", (req, res, next) => {
  next(new NotFoundError("Route not found!"));
});
app.use(errorHandler);

export { app };
