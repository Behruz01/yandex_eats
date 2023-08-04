import { pay } from "./../controller/payments.controller";
import { Router } from "express";

export const router = Router();
router.post("/payment", pay);
