import { fileUpload as uploader } from "../../middleware/fileUploads.middleware";
import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isAuth } from "../../middleware/isAuth.middleware";
import {
  createRestaurant,
  getRestaurant,
  deleteRestaurant,
  getOneRestaurant,
  updatedRestaurant,
  getLocationRest,
} from "./../controller/restaurant.controller";
import { Router } from "express";

export const router = Router();
router.post("/restaurant", createRestaurant);
router.get("/restaurant", getRestaurant);
router.get("/restaurant/location", getLocationRest);
router.delete("/restaurant/:id", isAdmin, deleteRestaurant);
router.put("/restaurant/:id", isAdmin, updatedRestaurant);
router.get("/restaurant/:id", getOneRestaurant);
