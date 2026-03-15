import { useEffect, useState } from "react";
import { Package, Minus, ChevronDown, AlertCircle } from "lucide-react";
import api from "../services/api";

function StockOut() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(res.data);
  };

  const handleSubmit = async () => {
    await api.post("/inventory/out", {
      productId: product,
      quantity,
    });

    alert("Xuất kho thành công");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-start justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 rounded-lg">
            <Minus className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Xuất kho</h1>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Product select */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Chọn sản phẩm
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-white"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="">Chọn sản phẩm</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Quantity input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Số lượng xuất
            </label>
            <div className="relative">
              <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="1"
                placeholder="Nhập số lượng"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <Minus className="h-5 w-5" />
            Xuất kho
          </button>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          Vui lòng kiểm tra kỹ thông tin trước khi xuất kho
        </p>
      </div>
    </div>
  );
}

export default StockOut;
