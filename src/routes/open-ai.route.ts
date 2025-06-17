import { Router } from "express";
import { getAIMenu } from "../controllers/openAi.controller";

const router = Router();

router.get("/get-menu", getAIMenu);

export default router;
