import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import {
  Package,
  Layers,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowUpCircle,
  Loader,
} from "lucide-react";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await getDashboard();
    setData(res.data);
  };

  const formatMoney = (value) => {
    return Number(value).toLocaleString("vi-VN") + " VND";
  };

  if (!data)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader className="h-6 w-6 animate-spin" />
          <span className="text-lg">Đang tải dữ liệu...</span>
        </div>
      </div>
    );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      {/* 4 Cards thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tổng sản phẩm */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Tổng sản phẩm</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {data.totalProducts}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Tổng tồn kho */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Tổng tồn kho</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {data.totalStock}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Layers className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Giá trị tồn kho */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Giá trị tồn kho
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1 break-words">
                {formatMoney(data.inventoryValue)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Tồn kho thấp */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Tồn kho thấp</p>
              <p className="text-3xl font-bold text-red-500 mt-1">
                {data.lowStock.length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 2 cột cho các phần còn lại (responsive: stack trên mobile, 2 cột trên lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sản phẩm tồn kho thấp */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="font-semibold text-gray-800">
              Sản phẩm tồn kho thấp
            </h2>
          </div>
          {data.lowStock.length === 0 ? (
            <p className="text-gray-500 text-sm py-2">Không có sản phẩm nào</p>
          ) : (
            <ul className="space-y-3">
              {data.lowStock.map((p) => (
                <li
                  key={p._id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                >
                  <span className="font-medium text-gray-800">{p.name}</span>
                  <span className="text-sm px-2 py-1 bg-red-200 text-red-800 rounded-full font-semibold">
                    {p.stock}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Nhập hàng gần đây */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-500" />
            <h2 className="font-semibold text-gray-800">Nhập hàng gần đây</h2>
          </div>
          <ul className="space-y-3">
            {data.recentStock
              .filter((item) => item.product)
              .map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <span className="font-medium text-gray-800">
                    {item.product.name}
                  </span>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <ArrowUpCircle className="h-4 w-4" />+{item.quantity}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        {/* Sản phẩm nhập nhiều nhất */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <h2 className="font-semibold text-gray-800">
              Sản phẩm nhập nhiều nhất
            </h2>
          </div>
          {data.topProducts.length === 0 ? (
            <p className="text-gray-500 text-sm py-2">Chưa có dữ liệu</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.topProducts.map((p, index) => {
                if (!p._id) return null;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100"
                  >
                    <span className="font-medium text-gray-800">
                      {p._id.name}
                    </span>
                    <span className="text-sm px-2 py-1 bg-purple-200 text-purple-800 rounded-full font-semibold">
                      {p.total}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
