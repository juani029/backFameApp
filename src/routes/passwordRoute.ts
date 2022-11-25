import { Router } from "express";
import { checkToken } from "../controllers/checkTokenController";
import { forgetPassword } from "../controllers/forgetPasswordController";
import { newPassword } from "../controllers/userController";


const router = Router();

router.post('/', forgetPassword)
router.get('/:token',checkToken)
router.post('/:token',newPassword)


export default router;