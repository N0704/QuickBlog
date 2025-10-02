import { useEffect, useState } from "react";
import { type Blog } from "../../data/data";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { assets } from "../../assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const {axios} = useAppContext();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/admin/blogs");
      console.log("API response:", res.data); 
      if(res.data.success) {
        setBlogs(res.data.data || []);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs?.length / limit);
  const currentBlogs = blogs?.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    if (blogs.length <= limit && page !== 1) {
      setPage(1);
    }
  }, [blogs, limit, page]);

  return (
    <div className="pt-5 px-5 sm:p-10">
      <div className="bg-white p-8 rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-3 text-gray-600">
            <img src={assets.dashboard_icon_4} alt="" />
            <p>All Blogs</p>
          </div>
          <input
            type="text"
            placeholder="Search blog..."
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"
          />
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto">
          <table className="min-w-full text-sm text-gray-500">
            <thead className=" text-gray-600 uppercase text-xs text-left">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">Blog Title</th>
                <th scope="col" className="px-4 py-3 max-sm:hidden">Date</th>
                <th scope="col" className="px-4 py-3 max-sm:hidden">Status</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentBlogs?.map((blogItem, index) => (
                <BlogTableItem
                  key={blogItem._id}
                  blog={blogItem}
                  fetchBlogs={fetchBlogs}
                  index={(page - 1) * limit + index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {blogs?.length > limit && (
          <div className="flex items-center justify-end mt-4 gap-0.5">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="pr-2 py-1 cursor-pointer disabled:opacity-0"
          >
            <ChevronLeft className="w-4 h-4"/>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 cursor-pointer ${
                page === i + 1 ? "text-gray-600 bg-gray-200/60 rounded" : "text-gray-600 hover:bg-gray-200/60 hover:rounded"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="pl-2 py-1 text-gray-600 cursor-pointer disabled:opacity-0"
          >
            <ChevronRight className="w-4 h-4"/>
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default ListBlog;
