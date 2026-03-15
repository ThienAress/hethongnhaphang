import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import InventoryHistory from "./pages/InventoryHistory";
import Purchase from "./pages/Purchase";
import StockOut from "./pages/StockOut";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inventory-history" element={<InventoryHistory />} />

        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/stock-out" element={<StockOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
