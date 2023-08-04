import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isCourier } from "../../middleware/isCourier.middleware";
import {
  postDelivery,
  getDelivery,
  deleteDelivery,
  updatedDelivery,
  getOneDelivery,
  getStory,
} from "./../controller/delivery.controller";
import { Router } from "express";

export const router = Router();
router.post("/delivery",  postDelivery);
router.get("/delivery", getDelivery);
router.get("/delivery/story", isCourier, getStory);
router.delete("/delivery/:id", isAdmin, deleteDelivery);
router.put("/delivery/:id",  updatedDelivery);
router.get("/delivery/:id", getOneDelivery);
