import React from 'react';
import type { Blog } from '../../data/data';
import { FileCheck2, FileMinus2, Trash2} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

interface BlogTableItemProps {
  blog: Blog;
  fetchBlogs: () => void;
  index: number;
}

const BlogTableItem: React.FC<BlogTableItemProps> = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return; 
      try {
        const res = await axios.post(`/api/blog/delete`, { id: blog._id });
        if (res.data.success) {
          toast.success(res.data.message);
          await fetchBlogs();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
  }

  const togglePublish = async () => {
    try {
      const res = await axios.post(`/api/blog/toggle-publish`, { id: blog._id });
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchBlogs();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <tr className="hover:bg-gray-50 transition border-none">
      <td scope='row' className="px-4 py-3">{index}</td>
      <td scope='row' className="px-4 py-3">{title}</td>
      <td scope='row' className="px-4 py-3 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td scope='row' className="px-4 py-3 max-sm:hidden">
        {isPublished ? (
          <span className="px-2.5 py-1.5 text-xs rounded-lg font-medium bg-green-100 text-green-500">
            Published
          </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded-lg font-medium bg-orange-100 text-orange-500">
            Draft
          </span>
        )}
      </td>
      <td scope='row' className="px-2 py-4 flex gap-2">
        <button onClick={togglePublish} title={blog.isPublished ? 'Unpublish' : 'Publish'}
          className={`${
            blog.isPublished ?
            "p-1.5 bg-transparent border border-gray-600 text-gray-600 hover:text-white rounded-sm hover:bg-gray-600 transition"
            :
            "p-1.5 bg-transparent border border-green-600 text-green-600 hover:text-white rounded-sm hover:bg-green-600 transition"
          }`}
        >
          {blog.isPublished ? (
            <FileMinus2 className='w-4 h-4'/>
          ) : (
            <FileCheck2 className='w-4 h-4'/>
          )}
        </button>
        <button onClick={deleteBlog} title='Remove'
          className="p-1.5 bg-transparent border border-red-400 text-red-400
            hover:text-white rounded-sm hover:bg-red-400 transition">
          <Trash2 className='w-4 h-4'/>
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
