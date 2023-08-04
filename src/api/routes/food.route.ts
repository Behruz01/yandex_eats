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

router.post("/food", postFoods);
router.get("/food", getFoods);
router.get("/food/:id", getOneFood);
router.put("/food/:id",isAdmin, updateFoods);
router.delete("/food/:id",isAdmin, deleteFood);
