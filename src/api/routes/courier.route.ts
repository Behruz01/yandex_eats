import { isAdmin } from "../../middleware/isAdmin.middleware";
import {
  postCourier,
  getCourier,
  deleteCourier,
  updatedCourier,
  getOneCourier,
  loginCourier,
} from "./../controller/courier.controller";

import { Router } from "express";

export const router = Router();
router.post("/courier", isAdmin, postCourier);
router.get("/courier", getCourier);
router.post("/courier/login", loginCourier);
router.delete("/courier/:id", isAdmin, deleteCourier);
router.put("/courier/:id", isAdmin, updatedCourier);
router.get("/courier/:id", getOneCourier);
