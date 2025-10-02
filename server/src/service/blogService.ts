import Blog from "../models/Blog";
import Comment from "../models/Comment";
import { uploadImage } from "../utils/imageHelper";

interface BlogBody {
    title: string;
    subTitle: string;
    description: string;
    category: string;
    isPublished: boolean | string;
    imageFile: Express.Multer.File;
}

interface CommentBody {
    blog: string; 
    name: string;
    content: string;
    isApproved: boolean | string;
}



 export const createBlog = async ({title, subTitle, description, category, isPublished, imageFile} : BlogBody) => {
    if(!title || !subTitle || !description || !category || typeof isPublished === "undefined" || !imageFile) {
        return {success: false, message: "All fields are required"};
    }

    const optimizedImageURL = await uploadImage(imageFile!);
    
    const blog = await Blog.create({
        title,
        subTitle,
        description,
        category,
        image: optimizedImageURL,
        isPublished: isPublished === "true" || isPublished === true,
    })
}

export const getAllBlogs = async () => {
    return await Blog.find({isPublished: true});
}

export const getBlogById = async (id: string) => {
        const blog =await Blog.findById(id).populate(
            {
                path: "comments",
                match: {isApproved: true},
                options: {sort: {createdAt: -1}}
            }
        );
        if(!blog) {
            return {success: false, message: "Blog not found"};
        }
        return blog
}


export const togglePublish = async (id: string) => {
    const blog = await Blog.findById(id);
    if(!blog) {
        return {success: false, message: "Blog not found"};
    }
    blog.isPublished = !blog.isPublished;
    return await blog.save();
}

export const createComment = async ({blog, name, content, isApproved} : CommentBody) => {
    if(!blog || !name || !content || typeof isApproved === "undefined") {
        return {success: false, message: "All fields are required"};
    }
    const newComment = await Comment.create({
        blog,
        name,
        content,
        isApproved: isApproved === "true" || isApproved === true,
      });
    
    
      await Blog.findByIdAndUpdate(blog, {
        $push: { comments: newComment._id },
      });
    
      return newComment;
}


