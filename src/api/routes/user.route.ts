import { Router } from "express";
import {
  getStoryUser,
  getUsers,
  loginUser,
  updateUser,
  registerUser,
  verifyEmail,
} from "../controller/user.controller";
import { isAuth } from "../../middleware/isAuth.middleware";

export const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/verify", verifyEmail);
router.post("/auth/login", loginUser);
router.put("/:id", updateUser);
router.get("/user", getUsers);
router.get("/user/story",isAuth, getStoryUser);

