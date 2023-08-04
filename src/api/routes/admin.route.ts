import { Router } from "express";
import { createAdmin, getAdmins, superAdmin } from "../controller/admin.controller";
import { isAdmin } from "../../middleware/isAdmin.middleware";

export const router = Router();

router.post("/admin", isAdmin, superAdmin);
router.post("/addAdmin",  createAdmin);
router.get("/getAdmins", isAdmin, getAdmins);
