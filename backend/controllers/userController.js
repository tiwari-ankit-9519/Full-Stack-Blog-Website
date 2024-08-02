import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { registerUserSchema, loginUserSchema } from "../utils/validatiors.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const prisma = new PrismaClient();

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, age, phone } = req.body;
  const profileImage = req.file?.path;

  const result = registerUserSchema.safeParse({
    name,
    email,
    password,
    age: Number(age),
    phone,
  });

  if (!result.success) {
    const errorMessage = result.error.errors.map((err) => err.message);
    return res
      .status(400)
      .json({ message: errorMessage[0] || "Validation Error" });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(409).json({ message: "User already exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      age: Number(age),
      phone,
      profileImage,
    },
    select: {
      name: true,
      email: true,
      age: true,
      phone: true,
      profileImage: true,
    },
  });

  res.status(201).json({
    message: "User registered successfully!",
    user,
    token: generateToken(user.id),
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = loginUserSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    const errorMessage = result.error.errors.map((err) => err.message);
    return res
      .status(400)
      .json({ message: errorMessage[0] || "Validation Error" });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, userExists.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      age: true,
      phone: true,
      profileImage: true,
    },
  });

  res.status(200).json({
    message: "User logged in successfully!",
    user,
    token: generateToken(userExists.id),
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.userAuthId;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      age: true,
      phone: true,
      profileImage: true,
    },
  });

  res.status(200).json({
    user,
  });
});
