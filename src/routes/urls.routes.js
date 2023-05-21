import { Router } from "express";
import { shortenUrl, urlById } from "../controllers/urls.controllers.js";
import { authValidate } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { urlSchema } from "../schemas/urls.schemas.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", authValidate, validateSchema(urlSchema), shortenUrl)
urlsRouter.get("/urls/:id", urlById)
urlsRouter.get("/urls/open/:shortUrl")
urlsRouter.delete("/urls/:id", authValidate)

export default urlsRouter;