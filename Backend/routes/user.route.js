import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getcurrentuser } from "../controllers/user.controller.js";

let userRouter = express.Router();
userRouter.get("/currentuser", isAuth, getcurrentuser);

export default userRouter;
