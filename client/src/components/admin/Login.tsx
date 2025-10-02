import { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const {axios, setToken} = useAppContext();
  const [email, setEmail] = useState<string>("admin@example.com");
  const [password, setPassword] = useState<string>("nghiabd");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });

      if(data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      } 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } 
    }
  }

  return (
    <div className="flex items-center justify-center h-screen relative">
        <img src={assets.logo} alt="" className="absolute top-4 left-14 sm:top-8 sm:left-28 w-32 sm:w-40"/>
        <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 
        rounded-lg shadow-xl shadow-primary/15">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-semibold mb-1"><span className="text-primary">Admin</span> Login</h1>
            <p className="font-light text-sm">Enter your credentials to access the admin panel</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-2 w-full sm:max-w-md text-gray-600">
              <div className="flex flex-col">
              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Enter your email" required 
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"/>
              </div>
              <div className="flex flex-col">
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password" required 
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"/>
              </div>
              <button type="submit" className="w-full py-3 font-medium rounded 
              bg-primary text-white cursor-pointer hover:bg-primary/90 transition-all">Login</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login