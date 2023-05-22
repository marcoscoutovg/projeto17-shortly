import { Router } from "express";
import { authValidate } from "../middlewares/auth.middlewares.js";

const usersRouter = Router()

usersRouter.get("/users/me", authValidate)

export default usersRouter;