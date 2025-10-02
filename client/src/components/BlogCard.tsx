import { useNavigate } from "react-router-dom";
import type { Blog } from "../context/AppContext";


const BlogCard = ({blog} : {blog : Blog}) => {

    const {_id, title, description, category, image} = blog;
    const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg shadow overflow-hidden hover:scale-102 hover:shadow-primary/25 duration-300
      cursor-pointer">
      <img src={image} alt="" className="aspect-video"/>
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 text-primary text-xs rounded-full">
        {category}
        </span>
        <div className="p-5">
          <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
          <p className="mb-3 text-xs text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{__html: description}}></p>
        </div>
    </div>
  )
}

export default BlogCard