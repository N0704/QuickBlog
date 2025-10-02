import { useEffect, useState } from "react";
import type { Dashboard as DashboardType } from "../../data/data";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState<DashboardType>({
    "blogs": 0,
    "comments": 0,
    "drafts": 0,
    "recentBlogs": [],
  });

  const {axios} = useAppContext();

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard");
      if(res.data.success) {
        setDashboardData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);


  return (
    <div className="p-5 md:p-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-4 bg-white rounded-lg 
            shadow p-6 cursor-pointer hover:scale-105 transition duration-300">
            <img src={assets.dashboard_icon_1} alt="" />
            <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs}</p>
            <p className="font-light text-gray-400">Blogs</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-lg 
            shadow p-6 cursor-pointer hover:scale-105 transition duration-300">
            <img src={assets.dashboard_icon_2} alt="" />
            <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.comments}</p>
            <p className="font-light text-gray-400">Comments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-lg 
            shadow p-6 cursor-pointer hover:scale-105 transition duration-300">
            <img src={assets.dashboard_icon_3} alt="" />
            <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts}</p>
            <p className="font-light text-gray-400">Drafts</p>
            </div>
          </div>
      </div>
  
      <div className="bg-white p-8 rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-3 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
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
                <th scope="col" className="px-4 py-3 ">#</th>
                <th scope="col" className="px-4 py-3">Blog Title</th>
                <th scope="col" className="px-4 py-3 max-sm:hidden">Date</th>
                <th scope="col" className="px-4 py-3 max-sm:hidden">Status</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Row example - bạn có thể render từ dữ liệu */}
              
                {dashboardData.recentBlogs.map((blog, index) => {
                  return (
                    <BlogTableItem
                      key={blog._id}
                      blog={blog}
                      fetchBlogs={fetchDashboard}
                      index={index + 1}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
        </div>         
  );
};

export default Dashboard;