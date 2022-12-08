import { Router } from "express";
import {
  deleteUserById,
  findUserByEmail,
  findUserById,
  updateFirstLoginUser,
} from "../controllers/userController";
import passport from "passport";
import { verifyTherapist } from "../middleware/passport";

const router = Router();

passport.use(verifyTherapist); // middleware

router.get("/", findUserByEmail);
router.get("/:id", findUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateFirstLoginUser);

export default router;
