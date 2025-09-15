import express from "express";
import cors from "cors";
import userRouter from "./router/user.js";
import { jwtErrorHandler } from "./middleware/auth.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,              
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user",userRouter)
app.use(jwtErrorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});