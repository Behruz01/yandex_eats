import { isAdmin } from "../../middleware/isAdmin.middleware";
import { getStoryUser } from "../controller/user.controller";
import {
  createOrder,
  getOrders,
  deleteOrder,
  updatedOrder,
  getOneOrder,
  getPending,
  getDelivered,
  getDelivering,
  getDenied,
  getDay,
  getSameDayOrders,
} from "./../controller/order.controller";
import { Router } from "express";

export const router = Router();
router.post("/order", createOrder);
router.get("/order", getOrders);
router.get("/order/delivering", getDelivering);
router.get("/order/denied", getDenied);
router.get("/order/delivered", getDelivered);
router.get("/order/day", getDay);
router.get("/order/same_day", getSameDayOrders);
router.get("/order/pending", getPending);
router.delete("/order/:id", isAdmin, deleteOrder);
router.put("/order/:id", updatedOrder);
router.get("/order/:id", getOneOrder);
