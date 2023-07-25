import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { connectDb } from "./src/configDb/dbConfig.js";
import UserRouter from "./src/routers/UserRouter.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//database
connectDb();

app.use("/api/v1/user", UserRouter);

//uncaught error handler
app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: error.message,
  };
  next(error);
});

//handle globle error

app.use((error, req, res, next) => {
  const statusCode = error.errorCode || 500;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server is running at http://localhost:${PORT}`);
});
