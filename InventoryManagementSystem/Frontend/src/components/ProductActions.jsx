// src/components/ProductActions.jsx

function ProductActions({ product, onSell, onRestock, onDelete }) {
  const handleSellClick = () => {
    if (!onSell) return;
    onSell(product); // tell parent which product to sell
  };

  const handleRestockClick = () => {
    if (!onRestock) return;
    onRestock(product);
  };

  const handleDeleteClick = () => {
    if (!onDelete) return;
    onDelete(product.id);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleSellClick}
        disabled={product.quantity === 0}
        className="text-xs px-3 py-1 rounded-full bg-emerald-500/90 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-500/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sell
      </button>

      <button
        type="button"
        onClick={handleRestockClick}
        className="text-xs px-3 py-1 rounded-full bg-indigo-500/90 text-white hover:bg-indigo-600 shadow-sm shadow-indigo-500/40 transition"
      >
        Restock
      </button>

      <button
        type="button"
        onClick={handleDeleteClick}
        className="text-xs px-3 py-1 rounded-full bg-red-500/90 text-white hover:bg-red-600 shadow-sm shadow-red-500/40 transition"
      >
        Delete
      </button>
    </div>
  );
}

export default ProductActions;
