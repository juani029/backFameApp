import { Router } from "express";
import { register } from "../controllers/userController";
import passport from "passport";

const router = Router();

router.post('/', register);

export default router;