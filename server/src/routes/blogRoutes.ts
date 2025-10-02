import { Router } from "express";
import { addBlog, addComment, deleteBlog, generateContent, getAllBlogs, getBlogById, togglePublish } from "../controllers/blogController";
import upload from "../middleware/multer";
import { auth } from "../middleware/auth";



const blogRouter: Router = Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/delete", auth, deleteBlog);
blogRouter.post("/toggle-publish", auth, togglePublish);

blogRouter.post("/add-comment", addComment);

blogRouter.post("/generate", auth, generateContent);


export default blogRouter;