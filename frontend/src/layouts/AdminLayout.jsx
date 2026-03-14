import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="p-6 bg-gray-100 min-h-screen">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
