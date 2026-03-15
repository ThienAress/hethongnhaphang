import { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  X,
  Package,
  DollarSign,
  Layers,
} from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  // format tiền
  const formatMoney = (value) => {
    if (!value) return "0";
    return Number(value).toLocaleString("vi-VN");
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditProduct(null);
    setFormData({ name: "", price: "", stock: "" });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const data = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editProduct) {
      await updateProduct(editProduct._id, data);
    } else {
      await createProduct(data);
    }

    fetchProducts();
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    await deleteProduct(id);
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="h-8 w-8 text-blue-600" />
          Quản lý sản phẩm
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Plus className="h-5 w-5" />
            <span>Thêm sản phẩm</span>
          </button>
        </div>
      </div>

      {/* Loading & Error */}
      {loading && (
        <div className="mb-4 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          Đang tải dữ liệu...
        </div>
      )}
      {error && (
        <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* Bảng sản phẩm - responsive */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Tên sản phẩm
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Giá
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Tồn kho
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="p-4 text-gray-700">
                      {formatMoney(product.price)} VND
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition flex items-center justify-center"
                          title="Sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition flex items-center justify-center"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phân trang */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="text-sm text-gray-600">
          Hiển thị {indexOfFirst + 1} -{" "}
          {Math.min(indexOfLast, filteredProducts.length)} /{" "}
          {filteredProducts.length} sản phẩm
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Trước</span>
          </button>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLast >= filteredProducts.length}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
          >
            <span className="hidden sm:inline">Sau</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Modal thêm/sửa sản phẩm */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                {editProduct ? (
                  <>
                    <Edit className="h-5 w-5 text-amber-500" />
                    Sửa sản phẩm
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-blue-600" />
                    Thêm sản phẩm
                  </>
                )}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên sản phẩm
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Nhập tên sản phẩm"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Nhập giá"
                    value={formatMoney(formData.price)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value.replace(/\./g, ""),
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số lượng tồn
                </label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Nhập số lượng"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 shadow-sm"
              >
                <Save className="h-4 w-4" />
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
