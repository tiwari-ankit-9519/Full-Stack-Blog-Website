import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { blogCreationSchema } from "../utils/validatiors.js";

const prisma = new PrismaClient();

export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const blogImages = req.files.map((file) => file.path);
  const userId = req.userAuthId;

  const result = blogCreationSchema.safeParse({
    title,
    content,
    category,
  });

  if (!result.success) {
    const errorMessage = result.error.errors.map((err) => err.message);
    return res
      .status(400)
      .json({ message: errorMessage[0] || "Validation Error" });
  }

  let categoryId;
  const categoryExists = await prisma.category.findFirst({
    where: {
      name: category,
    },
  });

  if (categoryExists) {
    categoryId = categoryExists.id;
  } else {
    const newCategory = await prisma.category.create({
      data: {
        name: category,
      },
    });
    categoryId = newCategory.id;
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      category: {
        connect: { id: categoryId },
      },
      user: {
        connect: { id: userId },
      },
      blogImages,
    },
  });

  res.status(201).json({ message: "Blog created successfully", post });
});

export const getAllBlogs = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      category: true,
    },
  });

  if (!posts) {
    return res.status(404).json({ message: "No blogs found" });
  }

  res.status(200).json({ message: "All blogs fetched successfully", posts });
});

export const getSingleBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          profileImage: true,
        },
      },
      category: true,
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(200).json({ message: "Blog fetched successfully", post });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const blogImages = req.files.map((file) => file.path);
  const userId = req.userAuthId;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (post.author.id !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let categoryId;
  const categoryExists = await prisma.category.findUnique({
    where: { name: category },
  });

  if (categoryExists) {
    categoryId = categoryExists.id;
  } else {
    const newCategory = await prisma.category.create({
      data: { name: category },
    });
    categoryId = newCategory.id;
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      categoryId,
      images: {
        deleteMany: {},
        createMany: {
          data: blogImages.map((image) => ({ url: image })),
        },
      },
    },
  });

  res
    .status(200)
    .json({ message: "Blog updated successfully", blog: updatedPost });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userAuthId;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });
  if (!post) {
    return res.status(404).json({ message: "Blog not found" });
  }
  if (post.author.id !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  await prisma.post.delete({ where: { id } });
  res.status(200).json({ message: "Blog deleted successfully" });
});

export const getlatestBlogs = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      category: true,
    },
  });
  res.status(200).json({ message: "Latest blogs fetched successfully", posts });
});

export const getBlogsUsingTitle = asyncHandler(async (req, res) => {
  const { title } = req.query;
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
    include: {
      user: true,
      category: true,
    },
  });

  if (posts.length === 0) {
    return res.status(404).json({ message: "No blogs found" });
  }

  res.status(200).json({ message: "Blogs fetched successfully", posts });
});

export const searchBlogs = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!category) {
    return res.status(400).json({ message: "Category parameter is required" });
  }

  const posts = await prisma.post.findMany({
    where: {
      category: {
        some: {
          name: {
            contains: category,
            mode: "insensitive",
          },
        },
      },
    },
    include: {
      user: true,
      category: true,
    },
  });

  if (posts.length === 0) {
    return res.status(404).json({ message: "No blogs found" });
  }

  res
    .status(200)
    .json({ message: "Search result fetched successfully", posts });
});
