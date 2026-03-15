import { useEffect, useState } from "react";
import {
  getSuppliers,
  createSupplier,
  deleteSupplier,
} from "../services/supplierService";
import {
  Building2,
  Phone,
  MapPin,
  Package,
  Plus,
  Trash2,
  Truck,
} from "lucide-react";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [productType, setProductType] = useState("");

  const fetchSuppliers = async () => {
    const res = await getSuppliers();
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleCreate = async () => {
    if (!name) return;

    await createSupplier({
      name,
      phone,
      address,
      productType,
    });

    setName("");
    setPhone("");
    setAddress("");
    setProductType("");

    fetchSuppliers();
  };

  const handleDelete = async (id) => {
    await deleteSupplier(id);
    fetchSuppliers();
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Truck className="h-8 w-8 text-blue-600" />
          Quản lý nhà cung cấp
        </h1>
      </div>

      {/* Form thêm mới */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-600" />
          Thêm nhà cung cấp mới
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tên */}
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Tên nhà cung cấp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* SĐT */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* Địa chỉ */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* Loại sản phẩm */}
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Loại sản phẩm"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="h-5 w-5" />
            Thêm nhà cung cấp
          </button>
        </div>
      </div>

      {/* Danh sách nhà cung cấp */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Tên nhà cung cấp
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Số điện thoại
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Địa chỉ
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Loại sản phẩm
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {suppliers.length > 0 ? (
                suppliers.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-900">{s.name}</td>
                    <td className="p-4 text-gray-700">{s.phone}</td>
                    <td className="p-4 text-gray-700">{s.address}</td>
                    <td className="p-4 text-gray-700">{s.productType}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition flex items-center gap-1 text-sm"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Chưa có nhà cung cấp nào
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

export default Suppliers;
