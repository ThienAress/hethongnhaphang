import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Truck,
  ShoppingCart,
  PackageMinus,
  Archive,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const menuItems = [
    { to: "/", label: "Tổng quan", icon: LayoutDashboard },
    { to: "/products", label: "Sản phẩm", icon: Package },
    { to: "/suppliers", label: "Nhà cung cấp", icon: Truck },
    { to: "/purchase", label: "Nhập hàng", icon: ShoppingCart },
    { to: "/stock-out", label: "Xuất hàng", icon: PackageMinus },
    { to: "/inventory", label: "Tồn kho", icon: Archive },
    { to: "/inventory-history", label: "Lịch sử kho", icon: History },
  ];

  return (
    <>
      {/* Mobile button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg shadow"
      >
        <Menu />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:relative z-50 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 flex flex-col shadow-2xl transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6 text-blue-400" />
              ERP Kho
            </h1>
            <p className="text-xs text-gray-400">Quản lý kho vận</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-300"
          >
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200 group"
          >
            <LogOut className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
