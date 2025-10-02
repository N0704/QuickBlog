import React, { useEffect, useState } from 'react'
import { type Comment } from '../../data/data'
import { motion } from "motion/react"
import CommentTableItem from '../../components/admin/CommentTableItem'
import { MessageSquareText } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments : React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([])
    const [filter, setFilter] = useState<string>("All")

    const {axios} = useAppContext();

    const fetchComments = async () => {
      try {
        const res = await axios.get("/api/admin/comments");
        if(res.data.success) {
          setComments(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    }

    useEffect(() => {
      fetchComments();
    }, [])

  return (
      <div className="p-5 sm:p-10">
      <div className="bg-white p-8 rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-3 text-gray-600">
          <MessageSquareText className=' text-primary' />
            <p>Comment</p>
          </div>
          <div className="flex items-center gap-3 relative">
            {["All", "Approved", "Pending"].map((item) => (
              <button key={item}
              onClick={() => setFilter(item)} className={`text-sm px-4 py-1 relative z-10
              ${filter === item ? "text-white" : "text-gray-500"}
              `}>
                {item}
                {filter === item && (
                  <motion.div layoutId='underline' transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute inset-0 bg-primary rounded-full -z-10">
                  </motion.div>
                )}
              </button>  
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto">
          <table className="min-w-full text-sm text-gray-500">
            <thead className=" text-gray-600 uppercase text-xs text-left">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">Comment</th>
                <th scope="col" className="px-4 py-3 max-sm:hidden">Status</th>
                <th scope="col" className="px-4 py-3 max-sm:hidden">Date</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                  {comments.filter((commentItem) => {
                    if (filter === "All") {
                      return true;
                    } else if (filter === "Approved") {
                      return commentItem.isApproved;
                    } else if (filter === "Pending") {
                      return !commentItem.isApproved;
                    }
                    return false; 
                  }).map((comment, index) => (
                    <CommentTableItem 
                    key={comment._id} 
                    comment={comment} 
                    fetchComments={fetchComments} 
                    index={index + 1} />
                  ))}         
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Comments