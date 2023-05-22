import { Router } from "express";
import { deleteUrl, getUrlById, openUrl, shortenUrl } from "../controllers/urls.controllers.js";
import { authValidate } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { urlSchema } from "../schemas/urls.schemas.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), shortenUrl)
urlsRouter.get("/urls/:id", getUrlById)
urlsRouter.get("/urls/open/:shortUrl", openUrl)
urlsRouter.delete("/urls/:id", authValidate, deleteUrl)

export default urlsRouter;