import {
  decreaseQuantity,
  fetchCartItems,
  increaseQuantity,
  removeFromCart,
} from "@/store/ShopCartSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formatPrice = (value) => `${Number(value).toFixed(2)} DH`;

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex gap-3.5 pb-4.5 border-b border-gray-100 last:border-0">
      <img
        src={item.product?.imageUrl}
        alt={item.product?.title}
        className="w-15 h-15 rounded-2xl object-cover bg-gray-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <Typography noWrap fontWeight={500} fontSize={14}>
          {item.product?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          fontSize={12.5}
          className="mb-2.5"
        >
          {item.product?.description}
        </Typography>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-1.5 py-1">
            <IconButton
              size="small"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
              onClick={onDecrease}
              className="!bg-white !w-5 !h-5"
            >
              <Minus className="w-3 h-3" />
            </IconButton>
            <span className="text-xs font-medium w-3 text-center select-none">
              {item.quantity}
            </span>
            <IconButton
              size="small"
              aria-label="Increase quantity"
              onClick={onIncrease}
              className="!bg-white !w-5 !h-5"
            >
              <Plus className="w-3 h-3" />
            </IconButton>
          </div>
          <Typography fontWeight={500} fontSize={14}>
            {formatPrice(item.product?.price * item.quantity)}
          </Typography>
        </div>
      </div>
      <IconButton
        size="small"
        aria-label="Remove from cart"
        onClick={onRemove}
        className="!text-gray-400 hover:!text-red-500 self-start"
      >
        <Trash2 className="w-4 h-4" />
      </IconButton>
    </div>
  );
}


function ShopCart() {
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const userId = useSelector((state) => state.auth?.user?.id);

  const items = cartItems?.items ?? [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product?.price * item.quantity, 0);

  useEffect(() => {
    if (userId) dispatch(fetchCartItems(userId));
  }, [userId]);

const handleOnRemove = async (productId) => {
  try {
    const result = await dispatch(removeFromCart({userId, productId})).unwrap();
    toast.success(result.message);
  } catch (e) {
    toast.error(e?.message);
  }
};

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpenCart(true)}
        aria-label="Open cart"
        className="relative rounded-full p-2 hover:bg-gray-100 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-medium text-white">
            {itemCount}
          </span>
        )}
      </button>

      <Dialog
        open={openCart}
        onClose={() => setOpenCart(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle className="flex items-center justify-between !py-5">
          <span>
            Your cart{" "}
            {itemCount > 0 && (
              <span className="text-gray-400 font-normal">({itemCount})</span>
            )}
          </span>
          <IconButton
            size="small"
            aria-label="Close"
            onClick={() => setOpenCart(false)}
            className="!bg-gray-100"
          >
            <X className="w-4 h-4" />
          </IconButton>
        </DialogTitle>

        <DialogContent
          className="!px-5 !pt-0 !pb-1"
          sx={{ maxHeight: 380, overflowY: "auto" }}
        >
          {items.length > 0 ? (
            <div className="flex flex-col gap-4.5">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onIncrease={() => dispatch(increaseQuantity(item.id))}
                  onDecrease={() => {console.log("l'item id: ", item.id );dispatch(decreaseQuantity(item.id))}}
                  onRemove={() => handleOnRemove(item.product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <ShoppingCart className="w-8 h-8 text-gray-300" />
              <Typography color="text.secondary">
                Your cart is empty.
              </Typography>
            </div>
          )}
        </DialogContent>

        {items.length > 0 && (
          <DialogActions className="!flex-col !items-stretch !p-5 gap-3.5 bg-gray-50 !border-t !border-gray-100">
            <div className="flex items-center justify-between px-1">
              <Typography color="text.secondary" fontSize={13.5}>
                Total
              </Typography>
              <Typography fontWeight={500} fontSize={19}>
                {formatPrice(total)}
              </Typography>
            </div>
            <Button
              variant="contained"
              fullWidth
              onClick={()=>{
                navigate("/shop/checkout");
                setOpenCart(false);
              }}
              disableElevation
              sx={{
                color: "white",
                borderRadius: "999px",
                py: 1.4,
                fontWeight: 500,
              }}
            >
              Checkout
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

export default ShopCart;
