import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext.tsx";


const Navbar = () => {
    const {navigate, token} = useAppContext();
  return (
    <div className="flex items-center justify-between py-5 mx-8 sm:mx-20 xl:mx-32">
        <img onClick={() => navigate("/")} src={assets.logo} alt="logo" className="w-32 sm:w-44 cursor-pointer" />
        <button onClick={() => navigate("/admin")} className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm rounded-full font-medium
            bg-primary text-white cursor-pointer">
            {token ? "Dashboard" : "Login"}
            <img src={assets.arrow} alt="arrow" className="w-3" />
        </button>
    </div>
  )
}

export default Navbar