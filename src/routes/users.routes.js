import { Router } from "express";
import { authValidate } from "../middlewares/auth.middlewares.js";
import { me } from "../controllers/users.controllers.js";

const usersRouter = Router()

usersRouter.get("/users/me", authValidate, me)

export default usersRouter;