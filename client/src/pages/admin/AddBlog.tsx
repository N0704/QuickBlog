import { useEffect, useRef, useState } from "react"
import { assets } from "../../assets/assets"
import Quill from "quill"
import { blogCategories } from "../../data/data"
import { useAppContext} from "../../context/AppContext"
import toast from "react-hot-toast"

const AddBlog = () => {

  const {axios} = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null)
  const quillRef = useRef<Quill | null>(null)

  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [category, setCategory] = useState("Select category")
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current?.root.innerHTML || "",
        category,
        isPublished
      }

      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("blog", JSON.stringify(blog));

      const res = await axios.post("/api/blog/add", formData);

      if(res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setSubTitle("");
        setImage(null);
        setCategory("Select category");
        quillRef.current?.setContents([]);
        setIsPublished(false);
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }finally {
      setIsAdding(false);
    }
  }

  const generateContent = async () => {
    if(!title) return toast.error("Please enter a title");
    try {
      setLoading(true);
      const res = await axios.post("/api/blog/generate", {prompt: title});
      if(res.data.success) {
        quillRef.current?.clipboard.dangerouslyPasteHTML(res.data.content);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {theme: "snow"})
    }
  }, [])

  return (
    <form onSubmit={onSubmit} className="p-5 sm:p-10">
      <div className="bg-white p-8 rounded-lg shadow text-gray-600">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" 
           className="mt-2 h-16 rounded cursor-pointer"/>
           <input onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }}} type="file" id="image" hidden required />
        </label>
        <p className="mt-4">Blog Title</p>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} 
        placeholder="Type here" required  className="w-full max-w-lg mt-2 p-2 border border-gray-300
         outline-none rounded"/>

         <p className="mt-4">Sub Title</p>
        <input type="text" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} 
        placeholder="Type here" required  className="w-full max-w-lg mt-2 p-2 border border-gray-300
         outline-none rounded"/>
        
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div className="" ref={editorRef}></div>
          {loading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center
             mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
             </div>
          )}
          <button disabled={loading} type="button" onClick={generateContent}
           className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 
            rounded hover:opacity-90 cursor-pointer">{loading ? "Generating..." : "Generate with AI"}</button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select value={category} onChange={(e) => setCategory(e.target.value)} name="category" className="mt-2 px-3 py-2 border border-gray-300 outline-none rounded text-gray-500">
          <option value="">Select category</option>
          {blogCategories.filter(item => item !== "All").map(item => (<option key={item} value={item}>{item}</option>))}
        </select>

        <div className="flex items-center gap-2 mt-4">
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} 
          className="scale-125 cursor-pointer" onChange={(e) => setIsPublished(e.target.checked)} />
        </div>

        <button disabled={isAdding} type="submit" 
          className="mt-8 bg-primary text-white w-40 h-10 rounded cursor-pointer text-sm hover:opacity-90">
            {isAdding ? "Adding..." : "Add Blog"}
            </button>
      </div>
    </form>
  )
}

export default AddBlog