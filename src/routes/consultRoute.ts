import { Router } from "express";
import {
  createConsult,
  updateConsult,
  deleteConsult,
  getAllConsults,
} from "../controllers/consultController";

const router = Router();

router.get("/", getAllConsults);
router.post("/", createConsult);
router.put("/:id", updateConsult);
router.delete("/:id", deleteConsult);

export default router;
