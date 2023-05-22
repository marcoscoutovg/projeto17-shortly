import { Router } from "express";
import authRouter from "./auth.routes.js";
import rankingRouter from "./ranking.routes.js";
import urlsRouter from "./urls.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(rankingRouter);
router.use(usersRouter);

export default router;
