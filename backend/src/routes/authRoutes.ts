import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/register", AuthController.validateRegistration, AuthController.register);
router.post("/login", AuthController.login);

export default router;