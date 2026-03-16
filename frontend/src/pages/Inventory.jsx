import { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  DollarSign,
  Archive,
  ChevronRight,
  Search,
} from "lucide-react";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const res = await axios.get(
      "https://hethongnhaphang-backend.onrender.com/api/products/inventory",
    );
    setProducts(res.data);
  };

  const formatMoney = (value) => {
    return Number(value).toLocaleString("vi-VN");
  };

  // Lọc sản phẩm theo tên
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Tính tổng giá trị toàn bộ kho (dựa trên tất cả sản phẩm, không filter)
  const totalValue = products.reduce((acc, p) => acc + (p.total || 0), 0);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header với tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Archive className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Tồn kho
          </h1>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-800">
                {products.length}
              </p>
            </div>
            <Package className="h-8 w-8 text-blue-500 opacity-80" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng tồn kho</p>
              <p className="text-2xl font-bold text-gray-800">
                {products.reduce((acc, p) => acc + (p.stock || 0), 0)}
              </p>
            </div>
            <Archive className="h-8 w-8 text-green-500 opacity-80" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng giá trị</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatMoney(totalValue)} VND
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500 opacity-80" />
          </div>
        </div>
      </div>

      {/* Bảng tồn kho */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Sản phẩm
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Archive className="h-4 w-4" />
                    Tồn kho
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Giá nhập
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Tổng giá trị
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-900">{p.name}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.stock > 10
                            ? "bg-green-100 text-green-800"
                            : p.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">
                      {formatMoney(p.price)} VND
                    </td>
                    <td className="p-4 font-semibold text-blue-600">
                      {formatMoney(p.total)} VND
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    {searchTerm
                      ? "Không tìm thấy sản phẩm phù hợp"
                      : "Không có dữ liệu tồn kho"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
