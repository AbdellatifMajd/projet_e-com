import React, { useEffect } from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { capturePayment } from '@/store/ShopOrderSlice';

function PaypalReturnPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("token");
    const payerId = params.get("PayerID");

    useEffect(() => {
        console.log("payment id: ", paymentId, "payer: ", payerId);

        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId")); 

            dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
                if (data.payload?.success) {
                    sessionStorage.removeItem("currentOrderId");
                    navigate("/shop/payment-success"); 
                }
            });
        }
    }, [dispatch, paymentId, payerId, navigate]);
  return (
    <Card>
        <CardHeader>
            <CardTitle>Payment processing... Please wait!</CardTitle>
        </CardHeader>
    </Card>
  )
}

export default PaypalReturnPage