import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { errorResponse, successResponse } from "../utils";
import { IUser } from "../models/user.interface";

export class UserController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      const body: Partial<IUser> = req.body;
      console.log("body: ", body);
      const { firstName, lastName, email, password } = body;
      if (!firstName || !lastName || !email || !password) {
        throw new Error("Please fill all the fields!");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      res.status(201).send(
        successResponse({
          _id: createdUser?._id,
          firstName: createdUser?.firstName,
          lastName: createdUser?.lastName,
          email: createdUser?.email,
        })
      );
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).send(errorResponse(err.message));
      }
      return res.status(500).send(errorResponse("Something went wrong!"));
    }
  }
}
