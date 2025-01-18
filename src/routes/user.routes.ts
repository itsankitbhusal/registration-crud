import { Request, Response, Router } from "express";
import { UserController } from "../controllers/users.controller";
// import { User } from "../models/user.model";

const router = Router();

// router.post("/update/db", async (req: Request, res: Response) => {
//   await User.updateMany(
//     { resetToken: { $exists: false } },
//     {
//       $set: {
//         resetToken: null,
//         resetTokenExpires: null,
// import updateExistingUsers from "../migration/migrate";
//       },
//     }
//   );
// });

router.post("/", UserController.register);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getByID);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.delete);

// login
router.post("/login", UserController.login);

// password reset
router.post("/password-reset-request", UserController.passwordResetRequest);
router.post("/password-reset", UserController.passwordReset);

export default router;
