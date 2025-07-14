import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#fea434]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/admin/news")}
          className="bg-white border border-[#fea434] p-6 rounded shadow hover:bg-orange-50"
        >
          Manage Newsletters
        </button>
        <button
          onClick={() => navigate("/admin/events")}
          className="bg-white border border-[#fea434] p-6 rounded shadow hover:bg-orange-50"
        >
          Manage Events
        </button>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="bg-white border border-[#fea434] p-6 rounded shadow hover:bg-orange-50"
        >
          Manage Blogs
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
