import { Router } from "express";
import { getAIMenu } from "../controllers/open-ai";

const router = Router();

router.get("/get-menu", getAIMenu);

export default router;
