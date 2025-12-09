// src/components/RestockProduct.jsx

function RestockProduct({ product, onConfirm, onClose }) {
  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtyValue = e.target.quantity.value;
    const qty = parseInt(qtyValue, 10);
    if (Number.isNaN(qty) || qty <= 0) {
      alert("Please enter a valid positive quantity.");
      return;
    }
    onConfirm(product.id, qty);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full border border-white/60 shadow-2xl">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Restock Product
        </h3>

        <div className="mb-4">
          <p className="text-sm text-slate-600">
            Product:
            <span className="font-semibold text-slate-900 ml-1">
              {product.name}
            </span>
          </p>
          <p className="text-xs text-slate-500">
            Current stock: {product.quantity}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Quantity to add
            </label>
            <input
              name="quantity"
              type="number"
              min="1"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-slate-900"
              placeholder="Enter quantity"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-500/40 transition-colors"
            >
              Restock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestockProduct;
