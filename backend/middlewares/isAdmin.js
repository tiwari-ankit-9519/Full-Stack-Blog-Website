import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isAdmin = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userAuthId,
    },
  });

  if (user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
