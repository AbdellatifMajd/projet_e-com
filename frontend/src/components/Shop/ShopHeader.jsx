import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, SearchIcon, X } from "lucide-react";
import ShopHeaderRightContent from "./ShopHeaderRightContent";

function ShopHeader() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(true);

const SearchBar = () => {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 transition focus-within:border-gray-400 focus-within:bg-white `}
    >
      <SearchIcon className="h-4 w-4 shrink-0 text-gray-400" />
      <input
        type="search"
        placeholder="Search a product..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
    </div>
  );
}


  return (
    <header className="sticky top-0 w-full border-b bg-white">
      <div className="flex items-center justify-between gap-4 px-4 md:px-6">
        <Link to="/shop/home" className="flex shrink-0 items-center gap-2">
          <img
            src="/logo_articia.webp"
            alt="Articia"
            className="w-24 h-16 rounded object-cover"
          />
        </Link>

        {/* Recherche desktop */}
        <div className="hidden max-w-md flex-1 lg:flex">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((o) => !o)}
            className="rounded-full p-2 hover:bg-gray-100 lg:hidden"
            aria-label="Rechercher"
          >


            {mobileSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <SearchIcon className="h-5 w-5" />
            )}
          </button>

          <ShopHeaderRightContent />

          <button
            type="button"
            className="rounded-full p-2 hover:bg-gray-100 lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t px-4 py-3 lg:hidden">
          <SearchBar />
        </div>
      )}
    </header>
  );
}

export default ShopHeader;