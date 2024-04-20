const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));
app.use(helmet());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use("/api/v1/users/", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
