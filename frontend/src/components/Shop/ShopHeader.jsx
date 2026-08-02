import { setOpenMenu } from "@/store/ShopProductSlice";
import { Heart, Menu, SearchIcon, ShoppingCart, User, X } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ShopHeader() {
  const { favorites, openMenu} = useSelector((state) => state.shopProduct);
  const favoriteCount = favorites.length;

  const nav_links = [
    { id: "account", icon: <User className="w-5 h-5" />, to: "/user/account" },
    {
      id: "favorites",
      icon: (
        <div className="relative">
          <Heart className="w-5 h-5" />

          {favoriteCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
              {favoriteCount}
            </span>
          )}
        </div>
      ),
      to: "/shop/favorites",
    },
    {
      id: "cart",
      icon: <ShoppingCart className="w-5 h-5" />,
      to: "/shop/cart",
    },
  ];

  const [searchItem, setSearchItem] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const { productList } = useSelector((state) => state.shopProduct);

  // Filtrage des produits en fonction du texte recherché
  const filteredProducts = useMemo(() => {
    if (!searchItem.trim()) return [];
    return productList.filter((p) =>
      p.title.toLowerCase().includes(searchItem.trim().toLowerCase()),
    );
  }, [searchItem, productList]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    setShowResults(value.trim().length > 0);
  };
const dispatch = useDispatch()
  const handleToggleMenu = () => dispatch(setOpenMenu(!openMenu));

  return (
    <div className="flex items-center justify-between gap-4 border-b p-3">
      <Link to="/" className="shrink-0">
        <img
          src="/logo_articia.webp"
          alt="articia"
          className="w-20 object-cover"
        />
      </Link>

      <div ref={searchRef} className="relative flex-1 max-w-lg">
        <div className="flex items-center gap-2 border border-gray-400 rounded-full px-4 py-2 focus-within:border-gray-600 transition-colors">
          <SearchIcon className="w-4 h-4 text-gray-500 shrink-0" />
          <input
            value={searchItem}
            onChange={handleSearchChange}
            onFocus={() => searchItem.trim() && setShowResults(true)}
            placeholder="Search a product..."
            className="w-full text-sm outline-none bg-transparent"
          />
          {searchItem && (
            <button
              type="button"
              onClick={() => {
                setSearchItem("");
                setShowResults(false);
              }}
              aria-label="Clear search"
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/product/${product.id}`}
                  onClick={() => setShowResults(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-8 h-8 object-cover rounded"
                    />
                  )}
                  <span className="text-sm">{product.title}</span>
                </Link>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-gray-500">
                No products found for "{searchItem}"
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {openMenu &&
          nav_links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            >
              {link.icon}
            </Link>
          ))}

        <button
          type="button"
          onClick={handleToggleMenu}
          aria-label={openMenu ? "Close menu" : "Open menu"}
          className="rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          {openMenu ? <X /> : <Menu />}
        </button>
      </div>
    </div>
  );
}

export default ShopHeader;
