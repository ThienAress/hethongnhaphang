import { useState } from "react";

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "Milk", price: 10, stock: 50 },
    { id: 2, name: "Coffee", price: 20, stock: 30 },
    { id: 3, name: "Sugar", price: 15, stock: 40 },
  ]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-3">{product.id}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3">{product.stock}</td>

              <td className="p-3 flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
