function Topbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>

      <div className="flex items-center gap-4">
        <span>Admin</span>
        <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/100" />
      </div>
    </div>
  );
}

export default Topbar;
