import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext, type AppContextType, type Blog } from "./AppContext.tsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]); 
  const [input, setInput] = useState<string>("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");

      setBlogs(data?.blogs || []);
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || error.message || "Axios error");
          } else {
            toast.error("Unexpected error");
          }
          setBlogs([]);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);
  
  useEffect(() => {
    if (token) {
      fetchBlogs();
    }
  }, [token]);

  const value : AppContextType = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
