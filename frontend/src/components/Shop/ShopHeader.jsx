import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "@/store/AuthSlice";
import { setOpenMenu } from "@/store/ShopProductSlice";

import {
  CircleUserIcon,
  Heart,
  LogOut,
  Menu,
  Minus,
  Plus,
  Search as SearchIcon,
  ShoppingCart,
  User,
  User2,
  User2Icon,
  X,
} from "lucide-react";

import ShopCart from "./ShopCart";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function ShopHeader() {
  const [searchItem, setSearchItem] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const location = useLocation();

  const {
    favorites = [],
    openMenu,
    productList,
  } = useSelector((state) => state.shopProduct);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const nav_links = [
    {
      id: "favorites",
      icon: (
        <div className="relative">
          <Heart className="w-5 h-5" />
          {favorites?.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {favorites?.length}
            </span>
          )}
        </div>
      ),
      to: "/shop/favorites",
    },
  ];

  const filteredProducts = useMemo(() => {
    if (!searchItem.trim()) return [];
    return (productList ?? []).filter((p) =>
      p.title.toLowerCase().includes(searchItem.trim().toLowerCase()),
    );
  }, [searchItem, productList]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    setShowResults(value.trim().length > 0);
  };

  const handleToggleMenu = () => dispatch(setOpenMenu(!openMenu));

  const handleAddToCart = (item) => {};

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
        <div className="flex items-center gap-2 border border-gray-400 rounded-full px-4 py-2 focus-within:border-gray-600">
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
        {(openMenu || isDesktop) &&
          nav_links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            >
              {link.icon}
            </Link>
          ))}

        {!isDesktop && (
          <button
            type="button"
            onClick={handleToggleMenu}
            aria-label={openMenu ? "Close menu" : "Open menu"}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            {openMenu ? <X /> : <Menu />}
          </button>
        )}
        <ShopCart />

        {isDesktop && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                <User2Icon className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 p-2 rounded-2xl shadow-lg"
            >
              <div className="flex flex-col items-center gap-2 pb-4 pt-2 border-b border-gray-100 mb-1">
                <CircleUserIcon
                  className="w-14 h-14 text-gray-300"
                  strokeWidth={1}
                />

                <div className="text-center">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>

              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-lg px-3 py-2.5 font-medium text-gray-700"
              >
                <Link
                  to="/shop/account"
                  className="flex w-full items-center"
                >
                  <User className="mr-2.5 h-4 w-4 text-gray-400 transition-colors" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => dispatch(logoutUser())}
                className="group cursor-pointer rounded-lg px-3 py-2.5 font-medium text-rose-600 data-[highlighted]:bg-rose-50 data-[highlighted]:text-rose-700"
              >
                <LogOut className="mr-2.5 h-4 w-4 text-rose-400 group-data-[highlighted]:text-rose-700 transition-colors" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default ShopHeader;
