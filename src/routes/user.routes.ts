import { Request, Response, Router } from "express";
import { UserController } from "../controllers/users.controller";

const router = Router();

router.post("/", UserController.register);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getByID);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.delete);


export default router;
