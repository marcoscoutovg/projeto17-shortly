import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";

const authRouter = Router()

authRouter.post("/signup", validateSchema(registerSchema), signUp)
authRouter.post("/signin", validateSchema(loginSchema), signIn)

export default authRouter;