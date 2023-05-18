import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";

const authRouter = Router()

authRouter.post("/signup", validateSchema(registerSchema))
authRouter.post("/signin", validateSchema(loginSchema))

export default authRouter;