import { Router } from "express";
import { findAllUsers } from "../controllers/userController";

const router = Router();

router.get("/", findAllUsers);

export default router;
