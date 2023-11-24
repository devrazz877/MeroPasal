import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { tryCatchAsyncError } from "./tryCatchAsyncErrors.js";
import ErrorHandler from "../utilis/errorHandler.js";

export const isAuthenticated = tryCatchAsyncError(async (req, res, next) => {
  const token = req?.headers?.authorization?.replace("Bearer ", "");
  if (!token) return next(new ErrorHandler("please login first", 401));

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodeData.id);
  if (!user) return next(new ErrorHandler("user doesnot exists", 400));

  req.user = user;
  next();
});

//for admin only

export const isAuthAdmin = tryCatchAsyncError(async (req, res,next) => {
  if (!req.user) return next(new ErrorHandler("waha sey hato tori ", 400));

  if (req.user.role != "admin") {
    return res
      .status(403)
      .json({ success: false, message: `${req.user.role}is not authorized` });
  }
  next();
});
