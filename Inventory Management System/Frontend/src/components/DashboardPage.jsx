// src/components/DashboardPage.jsx
import { useState, useEffect } from "react";
import ProductActions from "./ProductActions";
import SellProduct from "./SellProduct";
import RestockProduct from "./RestockProduct";

const TABS = ["products", "lowStock", "history"];

function DashboardPage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("products");

  // Backend data
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [history, setHistory] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    // Search state
  const [searchKeyword, setSearchKeyword] = useState("");

    // Sell popup state
  const [sellProductData, setSellProductData] = useState(null);

    // Restock popup state
  const [restockProductData, setRestockProductData] = useState(null);

  // Add product form
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // Load all data when dashboard mounts
  useEffect(() => {
    loadProducts();
    loadLowStock();
    loadHistory();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:8080/api/products");
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadLowStock() {
    try {
      const res = await fetch(
        "http://localhost:8080/api/products/low-stock?threshold=2"
      );
      if (!res.ok) return;
      const data = await res.json();
      setLowStockProducts(data);
    } catch {
      // ignore for now
    }
  }

  async function loadHistory() {
    try {
      const res = await fetch("http://localhost:8080/api/stock-history");
      if (!res.ok) return;
      const data = await res.json();
      setHistory(data);
    } catch {
      // ignore for now
    }
  }

    async function handleAddProduct(e) {
    e.preventDefault();
    try {
      setError("");
      const res = await fetch("http://localhost:8080/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price),
          quantity: Number(newProduct.quantity),
        }),
      });
      if (!res.ok) throw new Error("Failed to add product");
      setNewProduct({ name: "", category: "", price: "", quantity: "" });
      await loadProducts();
      await loadLowStock();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleSearch() {
    try {
      setError("");

      if (!searchKeyword.trim()) {
        await loadProducts();
        return;
      }

      const url = `http://localhost:8080/api/products/search?keyword=${encodeURIComponent(
        searchKeyword.trim()
      )}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to search products");

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
      setProducts([]);
    }
  }

    async function handleDeleteProduct(id) {
    if (!window.confirm("Delete this product and all its history?")) return;
    try {
      setError("");
      const res = await fetch(
        `http://localhost:8080/api/products/delete?id=${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete product");
      await loadProducts();
      await loadLowStock();
      await loadHistory();
    } catch (e) {
      setError(e.message);
    }
  }

async function handleRestockProduct(productId, qty) {
  try {
    setError("");
    const res = await fetch("http://localhost:8080/api/products/restock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, quantity: qty }),
    });
    if (!res.ok) throw new Error("Failed to restock product");
    await loadProducts();
    await loadLowStock();
    await loadHistory();
    closeRestockPopup();
  } catch (e) {
    setError(e.message);
  }
}

    function openSellPopup(product) {
    setSellProductData(product);
  }

  function closeSellPopup() {
    setSellProductData(null);
  }

    function openRestockPopup(product) {
    setRestockProductData(product);
  }

  function closeRestockPopup() {
    setRestockProductData(null);
  }

  async function handleSellProduct(productId, qty) {
  try {
    setError("");
    const res = await fetch("http://localhost:8080/api/products/sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, quantity: qty }),
    });
    if (!res.ok) throw new Error("Failed to sell product");
    await loadProducts();
    await loadLowStock();
    await loadHistory();
    closeSellPopup();
  } catch (e) {
    setError(e.message);
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-slate-100">
      {/* Top navbar */}
      <header className="border-b border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-indigo-500/80 flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <span className="text-xs font-semibold tracking-tight">IMS</span>
            </div>
            <div>
              <h1 className="heading-font text-lg font-semibold tracking-tight">
                Inventory Management System
              </h1>
              <p className="text-xs text-slate-200/70">
                Track products, stock levels, and sales in one place.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-slate-200/70">
                Logged in as
              </p>
              <p className="text-sm font-medium">
                {user?.fullName || "Admin User"}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="text-sm px-3 py-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/40 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs bar */}
        <div className="mb-4 flex items-center justify-between">
          <div className="inline-flex rounded-full bg-white/10 p-1 backdrop-blur-md border border-white/10 shadow-lg shadow-indigo-500/30">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition-all ${
                activeTab === "products"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-200/80 hover:bg-white/10"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("lowStock")}
              className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition-all ${
                activeTab === "lowStock"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-200/80 hover:bg-white/10"
              }`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition-all ${
                activeTab === "history"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-200/80 hover:bg-white/10"
              }`}
            >
              Stock History
            </button>
          </div>

          {/* {activeTab === "products" && (
            <button className="text-xs md:text-sm px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/40 transition-transform hover:scale-105">
              + Add Product
            </button>
          )} */}
        </div>

        {/* Error + loading */}
        {error && (
          <div className="mb-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-100 px-4 py-2 text-sm">
            {error}
          </div>
        )}
        {loading && (
          <div className="mb-3 rounded-xl bg-slate-800/60 border border-slate-600/60 px-4 py-2 text-sm">
            Loading...
          </div>
        )}

        {/* Card container */}
        <div className="bg-white/90 text-slate-900 border border-white/40 rounded-3xl p-6 shadow-xl shadow-slate-900/30 backdrop-blur-xl">
          {/* Products tab */}
          {activeTab === "products" && (
            <section>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="heading-font text-xl font-semibold">
                    Products
                  </h2>
                  <p className="text-sm text-slate-500">
                    Overview of all products in your inventory.
                  </p>
                </div>

                {/* Search bar */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    className="flex-1 md:w-64 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs md:text-sm font-medium px-3 py-2 shadow-md shadow-indigo-500/40 transition"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setSearchKeyword("");   // clear input
                      await loadProducts();   // reload full list
                    }}
                    className="rounded-xl bg-indigo-200 hover:bg-slate-300 text-slate-800 text-xs md:text-sm font-medium px-3 py-2 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Add Product form (simple inline) */}
              <form
                onSubmit={handleAddProduct}
                className="mb-4 grid gap-3 md:grid-cols-4 lg:grid-cols-5"
              >
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  required
                  placeholder="Category"
                  className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
                <input
                  type="number"
                  required
                  placeholder="Price"
                  step="0.01"
                  className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
                <input
                  type="number"
                  required
                  placeholder="Quantity"
                  className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs md:text-sm font-medium px-3 py-2 shadow-md shadow-indigo-500/40 transition-transform hover:scale-105"
                >
                  Add Product
                </button>
              </form>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Total Value</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                    <tbody>
                        {products.length === 0 ? (
                          <tr>
                            <td
                              colSpan={7}
                              className="px-4 py-6 text-center text-slate-500"
                            >
                              {searchKeyword.trim()
                                ? `No products found for "${searchKeyword.trim()}".`
                                : "No products yet. Add your first product above."}
                            </td>
                          </tr>
                        ) : (
                        products.map((p) => (
                          <tr
                            key={p.id}
                            className="border-t border-slate-100 hover:bg-indigo-50/50 transition-colors"
                          >
                            <td className="px-4 py-3 text-slate-700">{p.id}</td>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {p.name}
                            </td>
                            <td className="px-4 py-3 text-slate-600">{p.category}</td>
                            <td className="px-4 py-3 text-slate-700">
                              ₹{" "}
                              {Number((p.price || 0) * (p.quantity || 0)).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  p.quantity <= 5
                                    ? "bg-red-50 text-red-700"
                                    : "bg-emerald-50 text-emerald-700"
                                }`}
                              >
                                {p.quantity} in stock
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {p.createdDate}
                            </td>
                            <td className="px-4 py-3">
                              <ProductActions
                                product={p}
                                onSell={openSellPopup}
                                onRestock={openRestockPopup}
                                onDelete={handleDeleteProduct}
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Low Stock tab */}
          {activeTab === "lowStock" && (
            <section>
              <div className="mb-4">
                <h2 className="heading-font text-xl font-semibold">
                  Low Stock Alert
                </h2>
                <p className="text-sm text-slate-500">
                  Products at or below the reorder level (≤ 2 units).
                </p>
              </div>

              {lowStockProducts.length === 0 ? (
                <p className="text-sm text-emerald-600 bg-emerald-50/80 border border-emerald-100 rounded-xl px-4 py-3">
                  All products are sufficiently stocked.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockProducts.map((p) => (
                        <tr
                          key={p.id}
                          className="border-t border-slate-100 hover:bg-amber-50/70 transition-colors"
                        >
                          <td className="px-4 py-3 text-slate-700">{p.id}</td>
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {p.name}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {p.category}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                              {p.quantity} units
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Stock History tab */}
          {activeTab === "history" && (
            <section>
              <div className="mb-4">
                <h2 className="heading-font text-xl font-semibold">
                  Stock History
                </h2>
                <p className="text-sm text-slate-500">
                  Recent stock movements including restocks and sales.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Qty Changed</th>
                      <th className="px-4 py-3">Remaining Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-slate-500"
                        >
                          No stock movements yet.
                        </td>
                      </tr>
                    ) : (
                      history.map((log) => (
                        <tr
                          key={log.id}
                          className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-slate-700">
                            {log.logDate}
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {log.productName}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                log.type === "ADD"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {log.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {log.quantityChanged}
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {/* you can calculate remainingQty on backend later; for now leave blank or show "-" */}
                            -
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
               {/* Sell product popup */}
             <SellProduct
              product={sellProductData}
              onConfirm={handleSellProduct}
              onClose={closeSellPopup}
            />
            {/* Restock product popup */}
          <RestockProduct
            product={restockProductData}
            onConfirm={handleRestockProduct}
            onClose={closeRestockPopup}
          />
      </main>
    </div>
  );
}

export default DashboardPage;

