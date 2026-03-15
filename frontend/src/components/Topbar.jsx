import { Bell, User, ChevronDown, Menu, LogOut } from "lucide-react";

function Topbar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-6">
      {/* Left: menu icon for mobile and title */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition">
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">
          Hệ thống quản lý kho
        </h2>
      </div>

      {/* Right: notifications and user menu */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User dropdown */}
        <div className="flex items-center gap-1 md:gap-2 cursor-pointer p-1 rounded-md hover:bg-gray-100 transition">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline text-sm font-medium text-gray-700">
            Admin
          </span>
          <ChevronDown className="hidden sm:block h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
