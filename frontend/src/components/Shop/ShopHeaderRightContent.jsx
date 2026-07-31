import React from "react";
import { Avatar } from "@mui/material";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ShopHeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const initial = user?.name?.charAt(0)?.toUpperCase();

  return (
    <div className="flex items-center gap-1">
      <Link
        to="/shop/wishlist"
        className="rounded-full p-2 hover:bg-gray-100"
        aria-label="Favoris"
      >
        <Heart className="h-5 w-5" />
      </Link>

      <Link
        to="/shop/cart"
        className="relative rounded-full p-2 hover:bg-gray-100"
        aria-label="Panier"
      >
        <ShoppingCart className="h-5 w-5" />
      </Link>

      {user ? (
        <Link to="/shop/account" aria-label="Mon compte">
          <Avatar sx={{ width: 32, height: 32, fontSize: 14 }} className="bg-black">
            {initial}
          </Avatar>
        </Link>
      ) : (
        <Link
          to="/auth/login"
          className="rounded-full p-2 hover:bg-gray-100"
          aria-label="Se connecter"
        >
          <User className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}

export default ShopHeaderRightContent;