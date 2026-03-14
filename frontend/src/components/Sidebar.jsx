import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8">Inventory</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/suppliers">Suppliers</Link>
        <Link to="/inventory">Inventory</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
