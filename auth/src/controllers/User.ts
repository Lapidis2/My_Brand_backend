import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const InsertData = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    if (InsertData) {
      const secrete: any = process.env.JWT_SECRETE;
      const token = jwt.sign({ data: InsertData }, "mysecretekey123", {
        expiresIn: "1 h",
      });
      res.status(201).json({ message: "register successfully", token: token });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      const comparedPassword = bcrypt.compareSync(password, existUser.password);
      if (comparedPassword) {
        const secrete: any = process.env.JWT_SECRETE;
        const token = jwt.sign({ data: existUser }, "oursecretekey123", {
          expiresIn: "1 h",
        });
        res.status(200).json({ message: "login successfully", token: token });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
