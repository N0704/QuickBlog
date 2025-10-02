import { useState } from "react";
import { blogCategories} from "../data/data"
import { motion } from "motion/react"
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
    const [menu, setMenu] = useState<string>("All");
    const {blogs, input} = useAppContext();
    
    const filteredBlogs = () => {
        if(input === "") {
            return blogs;
        }
        return blogs.filter(blog => blog.title?.toLowerCase().includes(input.toLowerCase()) || 
        blog.category?.toLowerCase().includes(input.toLowerCase()));
    }

  return (
    <div className="">
        <div className="flex justify-center gap-3 my-10 relative">
            {blogCategories.map(item => (
                <div key={item} className="relative">
                    <button onClick={() => setMenu(item)}
                        className={`cursor-pointer text-gray-500 px-4 py-1 capitalize ${menu === item && "text-white"}`}>
                        {item}
                        {menu === item && (
                            <motion.div layoutId="underline"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute inset-0 bg-primary rounded-full -z-10"></motion.div>
                        )}
                        
                    </button>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
            {/* --- Blog Card --- */}
            {filteredBlogs()?.filter(blog => blog.category === menu || menu === "All")
            .map(blog => <BlogCard key={blog._id} blog={blog} />)}
            
        </div>
    </div>
  )
}

export default BlogList