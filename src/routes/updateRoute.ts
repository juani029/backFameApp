import { Router } from "express";
import { updateUser } from "../controllers/userController";
import passport from 'passport';
import { verifyTherapist } from "../middleware/passport";

const router = Router();

router.post('/', updateUser)

export default router;
