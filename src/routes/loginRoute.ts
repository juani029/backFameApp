import { Router } from "express";
import { login } from "../controllers/userController";

const router = Router();

router.post('/',login);

export default router;