import React from "react";
import Address from "./Address";
import { useDispatch, useSelector } from "react-redux";
import { CartItemRow } from "./ShopCart";
import { Button, Typography } from "@mui/material";
import { removeFromCart } from "@/store/ShopCartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ShopCheckout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const items = Array.isArray(cartItems)
    ? cartItems
    : cartItems?.items || [];

  const total = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  // 1. Déclarer productId comme paramètre de la fonction
  const handleRemoveItem = async (productId) => {
    if (!productId || !user?.id) return;
    
    try {
      const result = await dispatch(
        removeFromCart({ userId: user?.id, productId })
      ).unwrap();
      toast.success(result?.message || "Article retiré du panier");
    } catch (e) {
      toast.error(e || "Erreur lors de la suppression");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src="/images/account_img_banner.webp"
          alt="Checkout Banner"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItemRow
                key={item.id || item.product?.id || item.product_id} // 2. Ajout de la prop key requise
                item={item}
                onRemove={() => handleRemoveItem(item?.product?.id || item?.productId)}
              />
            ))
          ) : (
            <Typography color="text.secondary">
              Votre panier est vide.
            </Typography>
          )}

          <div className="flex items-center justify-between px-1">
            <Typography color="text.secondary" fontSize={13.5}>
              Total
            </Typography>
            <Typography fontWeight={500} fontSize={19}>
              {`${total.toFixed(2)} DH`}
            </Typography>
          </div>

          <Button
            variant="contained"
            fullWidth
            disabled={items.length === 0}
            onClick={() => {
              // Logique de paiement PayPal
              toast.info("Paiement PayPal en cours de développement");
            }}
            disableElevation
            sx={{
              color: "white",
              borderRadius: "999px",
              py: 1.4,
              fontWeight: 500,
            }}
          >
            Checkout with PayPal
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShopCheckout;