import { useEffect, useState } from "react";
import { getLogs } from "../services/inventoryLogService";
import {
  History,
  Search,
  Calendar,
  X,
  Package,
  ArrowUpCircle,
  ArrowDownCircle,
  Filter,
} from "lucide-react";

function InventoryHistory() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await getLogs();
    setLogs(res.data);
  };

  const filteredLogs = logs
    .filter((log) => log.product)
    .filter((log) =>
      log.product.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((log) => {
      if (!date) return true;
      const logDate = new Date(log.createdAt).toISOString().slice(0, 10);
      return logDate === date;
    });

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <History className="h-6 w-6 text-purple-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Lịch sử kho
        </h1>
      </div>

      {/* Filter section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Bộ lọc
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>
          {/* Date input */}
          <div className="flex-1 relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>
          {/* Reset button */}
          <button
            onClick={() => {
              setSearch("");
              setDate("");
            }}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center justify-center gap-2 border border-gray-300"
          >
            <X className="h-5 w-5" />
            <span className="hidden sm:inline">Xóa bộ lọc</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Ngày
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Sản phẩm
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Loại
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Số lượng
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(log.createdAt).toLocaleString("vi-VN")}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {log.product.name}
                    </td>
                    <td className="p-4">
                      {log.type === "IN" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          <ArrowUpCircle className="h-3.5 w-3.5" />
                          Nhập kho
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          <ArrowDownCircle className="h-3.5 w-3.5" />
                          Xuất kho
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-semibold">
                      <span
                        className={
                          log.type === "IN" ? "text-green-600" : "text-red-600"
                        }
                      >
                        {log.type === "IN" ? "+" : "-"}
                        {log.quantity}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Không tìm thấy lịch sử phù hợp
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

export default InventoryHistory;
