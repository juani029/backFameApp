import { Router } from "express";
import {
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUser,
  updateFirstLoginUser,
} from "../controllers/userController";
import passport from "passport";
import { verifyTherapist } from "../middleware/passport";

const router = Router();

passport.use(verifyTherapist); // middleware

router.get("/", passport.authenticate("jwt", { session: false }), findAllUsers);
router.get("/:id", findUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUser);
router.put("/:id", updateFirstLoginUser);

export default router;
