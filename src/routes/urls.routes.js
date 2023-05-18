import { Router } from "express";
import { authValidate } from "../middlewares/auth.middlewares.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", authValidate)
urlsRouter.get("/urls/:id")
urlsRouter.get("/urls/open/:shortUrl")
urlsRouter.delete("/urls/:id", authValidate)

export default urlsRouter;