import { getAllBlogs } from './blogController';
import { Request, Response } from "express";
import { AdminLoginBody } from "../types/auth";
import jwt from "jsonwebtoken";
import Blog from '../models/Blog';
import Comment from '../models/Comment';

export const adminLogin = async (
    req: Request<{}, {}, AdminLoginBody>,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET!);
        return res.status(200).json({ success: true, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getAllBlogsByAdmin = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getAllComment = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getDashboard = async (req: Request, res: Response) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            blogs,
            comments,
            drafts,
            recentBlogs
        }
        return res.status(200).json({ success: true, data: dashboardData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const toggleComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Comment id is required" });
        }
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        comment.isApproved = !comment.isApproved;
        await comment.save();
        return res.status(200).json({ success: true, message: "Comment status updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
