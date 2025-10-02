import { createComment } from './../service/blogService';
import { Request, Response } from "express";
import * as blogService from "../service/blogService";
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import main from '../configs/deepseek';

export const addBlog = async (req: Request, res: Response) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const blog = await blogService.createBlog({
            title,
            subTitle,
            description,
            category,
            isPublished,
            imageFile: req.file
        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await blogService.getAllBlogs();
        return res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:  "Internal Server Error"
        });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Blog id is required" });
        }

        const blog = await blogService.getBlogById(id);

        return res.status(200).json({ success: true, blog});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        await Blog.findByIdAndDelete(id);

        await Comment.deleteMany({ blog: id });
        
        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const togglePublish = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Blog id is required" });
        }

        await blogService.togglePublish(id);
        return res.status(200).json({ success: true, message: "Blog status updated" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const addComment = async (req: Request, res: Response) => {
    try {
        const {blog, name, content, isApproved} = req.body;

        const newComment = await blogService.createComment({blog, name, content, isApproved});

        return res.status(200).json({success: true, message: "Comment added for review", comment: newComment,});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export const generateContent = async (req: Request, res: Response) => {
    try {
        const {prompt} = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }
        const content = await main(`${prompt}. Generate a blog content for this topic in simple text format`);
        res.status(200).json({success: true, content});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}