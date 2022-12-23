const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth.routes");
const hotelRouter = require("./routes/hotel.routes");
const roomRouter = require("./routes/room.routes");
const userRouter = require("./routes/user.routes");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_ADDRESS, () => {
      console.log("Connected to Database");
    });
  } catch (error) {
    console.log(error);
  }
};

app.use(cookieParser());
app.use(express.json());

// Middlewares
app.use("/auth", authRouter);
app.use("/hotel", hotelRouter);
app.use("/room", roomRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: err.message || "Something went wrong!",
    stack: err.stack,
  });
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("Database connected");
});

app.listen(3000, () => {
  connect();
  console.log("Server is online.");
});
