import zod from "zod";

export const registerUserSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(8, { message: "Password should be of atleast 8 characters" }),
  age: zod.number().positive().min(1, { message: "Age is required" }),
  phone: zod.string().min(1, { message: "Phone number is required" }),
});

export const loginUserSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(8, { message: "Please enter the correct password" }),
});

export const blogCreationSchema = zod.object({
  title: zod.string().min(1, { message: "Title is required" }),
  content: zod.string().min(1, { message: "Content is required" }),
  category: zod.string().min(1, { message: "Category is required" }),
});
