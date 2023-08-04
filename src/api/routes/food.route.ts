import { Router } from "express";
import {
  deleteFood,
  getFoods,
  getOneFood,
  postFoods,
  updateFoods,
} from "../controller/food.controller";
import { isAdmin } from "../../middleware/isAdmin.middleware";

export const router = Router();

router.post("/post/food", postFoods);
router.get("/get/food", getFoods);
router.get("/get/food/:id", getOneFood);
router.put("/put/food/:id",isAdmin, updateFoods);
router.delete("/delete/food/:id",isAdmin, deleteFood);
