import { assets } from "../assets/assets"
import { footer } from "../data/data"

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 
           border-b border-gray-500/30 text-gray-500">
            <div className="">
                <img src={assets.logo} alt="" className="w-32 sm:w-44"/>
                <p className="max-w-[410px] mt-6">QuickBlog is a simple and fast platform for writing, managing, and sharing your blog posts, offering a clean interface and smooth experience.</p>
            </div>

            <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                {footer.map(({title, links}) => (
                    <div key={title}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-3">{title}</h3>
                    <ul className="text-sm space-y-2">
                        {links.map(link => (
                            <li key={link} className="hover:text-primary cursor-pointer">
                                <a href="#">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                ))}
            </div>
        </div>
        <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
            Copyright © 2025 - Developed by 
            <span className=" text-primary ml-1 cursor-pointer">Nghia Bui</span>
            </p>
    </div>
  )
}

export default Footer