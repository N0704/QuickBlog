import { Router } from "express";
import { adminLogin, deleteComment, getAllBlogsByAdmin, getAllComment, getDashboard, toggleComment} from "../controllers/adminController";
import { auth } from "../middleware/auth";

const adminRouter: Router = Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComment);
adminRouter.get("/blogs", auth, getAllBlogsByAdmin);
adminRouter.post("/delete-comment", auth, deleteComment);
adminRouter.post("/toggle-comment", auth, toggleComment);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;