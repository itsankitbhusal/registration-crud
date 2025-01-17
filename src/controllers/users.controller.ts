import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { errorResponse, successResponse } from "../utils";
import { IUser } from "../models/user.interface";

export class UserController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      const body: Partial<IUser> = req.body;
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

  static async getAllUsers(req: Request, res: Response): Promise<any> {
    try {
      const allUsers = await User.find({});

      const filteredAllUsers = allUsers?.map((user) => ({
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      }));

      res.status(200).send(successResponse(filteredAllUsers));
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).send(errorResponse(err.message));
      }
      return res.status(500).send(errorResponse("Something went wrong!"));
    }
  }

  static async getByID(req: Request, res: Response): Promise<any> {
    try {
      const userID = req.params.id;

      if (!userID) {
        throw new Error("User id not found");
      }

      const user = await User.findById(userID);

      if (user) {
        res.status(200).send(
          successResponse({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          })
        );
      } else {
        res.status(404).send(errorResponse("User not found"));
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).send(errorResponse(err.message));
      }
      return res.status(500).send(errorResponse("Something went wrong!"));
    }
  }

  static async update(req: Request, res: Response): Promise<any> {
    try {
      const userID = req.params.id;
      const { firstName, lastName } = req.body;

      if (!userID) {
        throw new Error("User id not found");
      }

      if (!firstName || !lastName) {
        return res.status(400).send(errorResponse("All fields are required"));
      }

      const updatedUser = await User.findByIdAndUpdate(
        userID,
        { firstName, lastName },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send(errorResponse("User not found"));
      }

      return res.status(200).send(
        successResponse({
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
        })
      );
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).send(errorResponse(err.message));
      }
      return res.status(500).send(errorResponse("Something went wrong!"));
    }
  }

  static async delete(req: Request, res: Response): Promise<any> {
    try {
      const userID = req.params.id;

      if (!userID) {
        throw new Error("User id not found");
      }

      const user = await User.findByIdAndDelete(userID);

      if (user) {
        res.status(200).send(
          successResponse({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          })
        );
      } else {
        res.status(404).send(errorResponse("User not found"));
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).send(errorResponse(err.message));
      }
      return res.status(500).send(errorResponse("Something went wrong!"));
    }
  }
}
