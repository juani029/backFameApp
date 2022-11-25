import { Router } from "express";
import { deleteUserById, findAllUsers, findUserById, login } from "../controllers/userController";

const router = Router();

router.post('/',login);
router.get('/', findAllUsers)
router.get('/:id', findUserById)
router.delete('/:id', deleteUserById)

export default router;
