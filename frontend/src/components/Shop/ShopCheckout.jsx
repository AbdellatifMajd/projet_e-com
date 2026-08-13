import React, { useEffect, useState } from "react";
import Address from "./Address";
import { useDispatch, useSelector } from "react-redux";
import { CartItemRow } from "./ShopCart";
import { Button, Typography } from "@mui/material";
import { removeFromCart } from "@/store/ShopCartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/store/ShopOrderSlice";

function ShopCheckout() {
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const {approvalURL} = useSelector((state) => state.shopOrder)

  const items = Array.isArray(cartItems)
    ? cartItems
    : cartItems?.items || [];

  const total = items.reduce((sum, item) => {
  const price =
    item.product?.salePrice > 0 ? item.product.salePrice : item.product?.price || 0;
  return sum + price * (item.quantity || 0);
}, 0);
 


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

  async function handleInitiatePaypalPayment(){

    if (cartItems.length === 0) {
      toast.warning("Your cart is empty. Please add items to proceed")
      return;
    }
    if (currentSelectedAddress === null) {
      toast.warning("Please select one address to proceed.")
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?.id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.product?.id,
        title: singleCartItem?.product?.title,
        image: singleCartItem?.product?.imageUrl,
        price:
          singleCartItem?.product?.salePrice > 0
            ? singleCartItem?.product?.salePrice
            : singleCartItem?.product?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?.id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: total,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };


    try {
    const result = await dispatch(createOrder(orderData)).unwrap();
    console.log("approval URL", result?.approvalURL);

    if (result?.success) {
      setIsPaymentStart(true);
    } else {
      setIsPaymentStart(false);
      toast.error(result?.message || "Impossible de créer la commande");
    }
  } catch (errorMessage) {
    setIsPaymentStart(false);
    toast.error(errorMessage || "Erreur lors de la création de la commande");
  }

  }


      useEffect(()=>{
        if(approvalURL){
      window.location.href = approvalURL;
    }
      }, [approvalURL])

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
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>
        <div className="flex flex-col gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItemRow
                key={item.id || item.product?.id } // 2. Ajout de la prop key requise
                item={item}
                onRemove={() => handleRemoveItem(item?.product?.id || item?.productId)}
              />
            ))
          ) : (
            <Typography color="text.secondary">
              Cart empty.
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
              handleInitiatePaypalPayment()
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