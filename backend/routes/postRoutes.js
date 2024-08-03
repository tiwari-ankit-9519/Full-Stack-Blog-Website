import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getlatestBlogs,
  getBlogsUsingTitle,
  searchBlogs,
} from "../controllers/postController.js";
import upload from "../config/uploadMiddleware.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", upload.array("blogImages", 5), isLoggedIn, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", isLoggedIn, updateBlog);
router.delete("/:id", isLoggedIn, deleteBlog);
router.get("/post/latest", getlatestBlogs);
router.get("/search/title", getBlogsUsingTitle);
router.get("/filter/:category", searchBlogs);

export default router;
