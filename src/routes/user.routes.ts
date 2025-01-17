import { Request, Response, Router } from "express";
import { UserController } from "../controllers/users.controller";

const router = Router();

router.post("/", UserController.register);

export default router;
