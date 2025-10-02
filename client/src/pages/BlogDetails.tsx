import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Comment } from "../data/data";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import Moment from "moment";
import Loader from "../components/Loader";
import { useAppContext, type Blog } from "../context/AppContext";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const {id} = useParams();
  const {axios} = useAppContext();

  const [data, setData] = useState<Blog | null>(null);
  const [comment, setComment] = useState<Comment[]>([]);

  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      if(res.data.success) {
        setData(res.data.blog);
        setComment(res.data.blog.comments);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const addComment = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/blog/add-comment`, {blog: id, name, content, isApproved:true});
      if(res.data.success) {
        setComment([...comment, res.data.comment]);
        toast.success(res.data.message);
        setName("");
        setContent("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [id])

  if(!data) {
    return <Loader/>
  }

  return (
    <div className="relative">
      <img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-1 opacity-50"/>
      <Navbar/>
      <div className="text-center mt-10 text-gray-600">
        <p className="text-primary py-4 font-medium">Published on {Moment(data.createdAt).format("MMMM Do YYYY")}</p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">{data.title}</h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm
         border-primary/35 bg-primary/5 font-medium text-primary">Nghia Bui</p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
          <img src={data.image} alt="" className="rounded-3xl mb-5"/>

          <div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html: data.description}}></div>

          {/* --- Comment Section --- */}
          <div className="mt-14 mb-10 max-w-3xl mx-auto">
            <p className="font-semibold mb-4 text-gray-800">Comments ({comment.length})</p>
            <div className="flex flex-col gap-4">
              {comment.map(item => (
                <div key={item._id} className="relative bg-primary/2 border border-primary/5 
                rounded max-w-xl p-4 text-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} alt="" className="w-6"/>
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-sm max-w-md ml-8">{item.content}</p>
                    <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                      {Moment(item.createdAt).fromNow()}
                      </div>
                </div>
              ))}
            </div>
          </div>
           {/* --- Add Comment Section --- */}
           <div className="max-w-3xl mx-auto">
            <p className="font-semibold mb-4 text-gray-800">Add your comment</p>
            <form onSubmit={addComment} className="flex flex-col items-start gap-4 max-w-lg">
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full border border-gray-300 
              p-2 rounded outline-none" />
              <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder="Comment" required className="w-full border border-gray-300 p-2 
              rounded outline-none h-48"></textarea>
              <button type="submit" className="bg-primary text-white p-2 rounded px-8 
              hover:scale-102 transition-all cursor-pointer">Submit</button>
            </form>
           </div>

           {/* --- Share Button --- */}
           <div className="my-24 max-w-3xl mx-auto">
              <p className="font-semibold my-4 text-gray-800">Share this article on social media</p>
              <div className="flex items-center">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.googleplus_icon} alt="" />
           </div>
           </div>
        </div>
      <Footer/>
    </div>
  )
}

export default BlogDetails