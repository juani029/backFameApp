import { Router } from "express";
import { updateUser } from "../controllers/userController";

const router = Router();

router.put("/", updateUser);

export default router;
