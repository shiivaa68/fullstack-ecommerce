import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {registerValidator,loginValidator} from "../validators/authValidator"
import {validate} from "../middlewares/validate"

const router = Router();

router.post("/register",registerValidator,validate, register);
router.post("/login",loginValidator,validate, login);

export default router;
