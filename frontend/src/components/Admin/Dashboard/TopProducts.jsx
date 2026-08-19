const TopProducts = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <h2 className="font-semibold mb-4">Top Products</h2>
        <p className="text-gray-400 text-sm">Aucune vente pour le moment.</p>
      </div>
    );
  }

  const maxQuantity = Math.max(...products.map((p) => p.quantity));

  return (
    <div className="bg-white rounded-lg border p-4">
      <h2 className="font-semibold mb-4">Top Products</h2>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500 shrink-0">
              {index + 1}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="truncate text-sm font-medium">
                  {product.title}
                </span>
                <span className="text-sm text-gray-500 shrink-0 ml-2">
                  {product.quantity} sold
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${(product.quantity / maxQuantity) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;