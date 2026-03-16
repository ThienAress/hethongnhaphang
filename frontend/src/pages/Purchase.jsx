import { useEffect, useState } from "react";
import axios from "axios";
import {
  Truck,
  Package,
  ShoppingCart,
  DollarSign,
  Calculator,
  Save,
  Building2,
  Hash,
} from "lucide-react";

function Purchase() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [supplier, setSupplier] = useState("");
  const [product, setProduct] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const token = localStorage.getItem("token");

  const formatMoney = (value) => {
    if (!value) return "0";
    return Number(value).toLocaleString("vi-VN");
  };

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, []);

  const fetchSuppliers = async () => {
    const res = await axios.get(
      "https://hethongnhaphang-backend.onrender.com/api/suppliers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setSuppliers(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(
      "https://hethongnhaphang-backend.onrender.com/api/products",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setProducts(res.data);
  };

  const handleSubmit = async () => {
    await axios.post(
      "https://hethongnhaphang-backend.onrender.com/api/purchases",
      {
        supplierId: supplier,
        productId: product,
        quantity,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert("Nhập hàng thành công");
  };

  const total = quantity * price;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingCart className="h-8 w-8 text-blue-600" />
          Nhập hàng
        </h1>
        <p className="text-gray-600 mt-1">
          Tạo phiếu nhập hàng từ nhà cung cấp
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Package className="h-5 w-5" />
            Thông tin nhập hàng
          </h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Supplier Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Building2 className="h-4 w-4 text-gray-500" />
              Nhà cung cấp
            </label>
            <div className="relative">
              <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              >
                <option value="">Chọn nhà cung cấp</option>
                {suppliers.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Package className="h-4 w-4 text-gray-500" />
              Sản phẩm
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
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
            </div>
          </div>

          {/* Quantity & Price row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Hash className="h-4 w-4 text-gray-500" />
                Số lượng
              </label>
              <div className="relative">
                <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Số lượng"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-500" />
                Giá nhập
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Giá nhập"
                  value={formatMoney(price)}
                  onChange={(e) => setPrice(e.target.value.replace(/\./g, ""))}
                />
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800 flex items-center gap-1">
              <Calculator className="h-4 w-4" />
              Tổng tiền
            </span>
            <span className="text-xl font-bold text-blue-900">
              {formatMoney(total)} VND
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!supplier || !product || quantity <= 0 || price <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
          >
            <Save className="h-5 w-5" />
            Xác nhận nhập hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default Purchase;
