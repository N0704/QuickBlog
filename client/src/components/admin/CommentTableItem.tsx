import React from 'react'
import type { Comment } from '../../data/data';
import { assets } from '../../assets/assets';
import Moment from "moment";
import { MessageSquareShare, MessageSquareWarning, MessageSquareX, MessagesSquare, Play } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

interface CommentProps {
    comment: Comment;
    fetchComments: () => void;
    index: number;
}

const CommentTableItem: React.FC<CommentProps> = ({ comment, fetchComments, index }) => {
    const { blog, createdAt, _id} = comment;

    const { axios } = useAppContext();

    const approveComment = async () => {
        try {
            const res = await axios.post(`/api/admin/toggle-comment`, { id: _id });
            if(res.data.success) {
                toast.success(res.data.message);
                await fetchComments();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const deleteComment = async () => {
        const confirm = window.confirm("Are you sure you want to delete this comment?");
        if(!confirm) return;
        try {
            const res = await axios.post(`/api/admin/delete-comment`, { id: _id });
            if(res.data.success) {
                toast.success(res.data.message);
                await fetchComments();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    return (
        <tr>
            <td className="px-4 py-4">{index}</td>
            <td className='px-4 py-4'>
                <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <img src={assets.user_icon} alt="" className="w-6" />
                    <p className="font-medium flex items-center gap-2">{comment.name} 
                        <Play className='w-2 h-2 text-primary'/>
                    {blog.title}</p>
                </div>
                <p className="flex items-center gap-3 text-sm max-w-md ml-8">
                    <MessagesSquare className='w-4 h-4 text-gray-400'/> {comment.content}</p>
                </div>
            </td>
            <td className='px-4 py-4'>
            {comment.isApproved ? (
                    <span className="px-2.5 py-1.5 text-xs rounded-lg font-medium bg-green-100 text-green-500">
                        Approved
                    </span>
                    ) : (
                    <span className="px-2 py-1 text-xs rounded-lg font-medium bg-yellow-100 text-yellow-500">
                        Pending
                    </span>
                    )}
            </td>
            <td className="px-4 py-4 text-xs">
                {Moment(createdAt).fromNow()}
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-2">
              <button onClick={approveComment} title={comment.isApproved ? 'Approved' : 'Pending'}
          className={`${
            !comment.isApproved ?
            "p-1.5 bg-transparent border border-gray-600 text-gray-600 hover:text-white rounded-sm hover:bg-gray-600 transition"
            :
            "p-1.5 bg-transparent border border-green-600 text-green-600 hover:text-white rounded-sm hover:bg-green-600 transition"
          }`}
        >
          {!comment.isApproved ? (
            <MessageSquareWarning className='w-4 h-4'/>
          ) : (
            <MessageSquareShare className='w-4 h-4'/>
          )}
        </button>
        <button onClick={deleteComment} title='Remove'
          className="p-1.5 bg-transparent border border-red-400 text-red-400
            hover:text-white rounded-sm hover:bg-red-400 transition">
          <MessageSquareX className='w-4 h-4'/>
        </button>
              </div>
            </td>
        </tr>
    );
};

export default CommentTableItem;
