import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
