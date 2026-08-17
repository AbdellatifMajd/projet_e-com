<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Srmklive\PayPal\Services\PayPal as PayPalClient;


class OrderController extends Controller
{


    // create order funtion 
public function createOrder(Request $request)
{
    $validated = $request->validate([
        'userId' => 'nullable|integer',
        'cartId' => 'nullable|integer',
        'cartItems' => 'required|array|min:1',
        'cartItems.*.productId' => 'required',
        'cartItems.*.title' => 'required|string',
        'cartItems.*.image' => 'nullable|string',
        'cartItems.*.price' => 'required|numeric',
        'cartItems.*.quantity' => 'required|integer|min:1',
        'addressInfo' => 'required|array',
        'addressInfo.addressId' => 'nullable',
        'addressInfo.address' => 'nullable|string',
        'addressInfo.city' => 'nullable|string',
        'addressInfo.pincode' => 'nullable|string',
        'addressInfo.phone' => 'nullable|string',
        'addressInfo.notes' => 'nullable|string',
        'orderStatus' => 'nullable|string',
        'paymentMethod' => 'nullable|string',
        'paymentStatus' => 'nullable|string',
        'totalAmount' => 'required|numeric',
        'orderDate' => 'nullable|date',
        'orderUpdateDate' => 'nullable|date',
    ]);

    $data = [
        'user_id' => $validated['userId'] ?? null,
        'cart_id' => $validated['cartId'] ?? null,
        'cart_items' => collect($validated['cartItems'])->map(fn ($item) => [
            'product_id' => $item['productId'],
            'title' => $item['title'],
            'image' => $item['image'] ?? null,
            'price' => $item['price'],
            'quantity' => $item['quantity'],
        ])->toArray(),
        'address_info' => [
            'address_id' => $validated['addressInfo']['addressId'] ?? null,
            'address' => $validated['addressInfo']['address'] ?? null,
            'city' => $validated['addressInfo']['city'] ?? null,
            'pincode' => $validated['addressInfo']['pincode'] ?? null,
            'phone' => $validated['addressInfo']['phone'] ?? null,
            'notes' => $validated['addressInfo']['notes'] ?? null,
        ],
        'order_status' => $validated['orderStatus'] ?? 'pending',
        'payment_method' => $validated['paymentMethod'] ?? 'paypal',
        'payment_status' => $validated['paymentStatus'] ?? 'pending',
        'total_amount' => $validated['totalAmount'],
        'order_date' => now(),
        'order_update_date' => now(),
    ];

    try {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->setAccessToken($provider->getAccessToken());

        $paypalOrder = $provider->createOrder([
            'intent' => 'CAPTURE',
            'application_context' => [
                'return_url' => 'http://localhost:5173/shop/paypal-return',
                'cancel_url' => 'http://localhost:5173/shop/paypal-cancel',
            ],
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' => 'USD',
                        'value' => number_format($data['total_amount'], 2, '.', ''),
                        'breakdown' => [
                            'item_total' => [
                                'currency_code' => 'USD',
                                'value' => number_format($data['total_amount'], 2, '.', ''),
                            ],
                        ],
                    ],
                    'items' => collect($data['cart_items'])->map(fn ($item) => [
                        'name' => $item['title'],
                        'sku' => $item['product_id'],
                        'unit_amount' => [
                            'currency_code' => 'USD',
                            'value' => number_format($item['price'], 2, '.', ''),
                        ],
                        'quantity' => $item['quantity'],
                    ])->toArray(),
                    'description' => 'description',
                ],
            ],
        ]);

        if (! isset($paypalOrder['id'])) {
            Log::error('Erreur création paiement PayPal', $paypalOrder);

            return response()->json([
                'success' => false,
                'message' => 'Error while creating paypal payment',
            ], 500);
        }

        $order = DB::transaction(function () use ($data, $paypalOrder) {
            $order = Order::create([
                'user_id' => $data['user_id'],
                'cart_id' => $data['cart_id'],
                'address_id' => $data['address_info']['address_id'],
                'address' => $data['address_info']['address'],
                'city' => $data['address_info']['city'],
                'pincode' => $data['address_info']['pincode'],
                'phone' => $data['address_info']['phone'],
                'notes' => $data['address_info']['notes'],
                'order_status' => $data['order_status'],
                'payment_method' => $data['payment_method'],
                'payment_status' => $data['payment_status'],
                'total_amount' => $data['total_amount'],
                'order_date' => $data['order_date'],
                'order_update_date' => $data['order_update_date'],
                'payment_id' => $paypalOrder['id'],
                'payer_id' => null,
            ]);

            foreach ($data['cart_items'] as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'title' => $item['title'],
                    'image' => $item['image'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                ]);
            }

            return $order;
        });

        $approvalUrl = collect($paypalOrder['links'])->firstWhere('rel', 'approve')['href'] ?? null;

        return response()->json([
            'success' => true,
            'approvalUrl' => $approvalUrl,
            'orderId' => $order->id,
        ], 201);
    } catch (Exception $e) {
        Log::error($e->getMessage());

        return response()->json([
            'success' => false,
            'message' => 'Some error occured! '.$e->getMessage(),
        ], 500);
    }
}


    //capture payment
    public function capturePayment(Request $request){
            Log::info('Capture payment request:', $request->all());

    $validated = $request->validate([
        'paymentId' => 'required|string',
        'payerId' => 'nullable|string',
        'orderId' => 'required|integer',
    ]);

    try {
        $order = Order::with('items')->find($validated['orderId']);

        if (! $order) {
            return response()->json([
                'success' => false,
                'message' => 'Order can not be found',
            ], 404);
        }

        $order = DB::transaction(function () use ($order, $validated) {
            foreach ($order->items as $item) {
                $product = Product::where('id', $item->product_id)->lockForUpdate()->first();

                if (! $product) {
                    throw new \Exception("Product not found (id: {$item->product_id}, title: {$item->title})");
                }

                if ($product->totalStock < $item->quantity) {
                    throw new \Exception("Not enough stock for {$product->title}. Available: {$product->totalStock}, requested: {$item->quantity}");
                }

                $product->decrement('totalStock', $item->quantity);
            }

            $order->update([
                'payment_status' => 'paid',
                'order_status' => 'confirmed',
                'payment_id' => $validated['paymentId'],
                'payer_id' => $validated['payerId'],
                'order_update_date' => now(),
            ]);

            if ($order->cart_id) {
                Cart::where('id', $order->cart_id)->delete();
            }

            return $order;
        });

        return response()->json([
            'success' => true,
            'message' => 'Order confirmed',
            'data' => $order->fresh('items'),
        ], 200);
    } catch (\Exception $e) {
        Log::error($e->getMessage());

        return response()->json([
            'success' => false,
            'message' => $e->getMessage() ?: 'Some error occured!',
        ], 500);
    }
}


//getOrdeDetails 
public function getAllOrdersByUserId($userId){
    try{
        $order = Order::with(['items'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }
        return response()->json([
            'success' => true, 
            'data' => $order
        ], 200);
    }
    catch(Exception $e){
        Log::error($e);
        return response()->json([
            'success' => false,
            'message' => 'An error occured: ' . $e->getMessage()]
            , 500);
    }
}

public function getOrderDetails($orderId){
    try{
        $order = Order::with(['items'])->where("id", $orderId)->first();
        
        if(!$order){
            return response()->json([
                'success' => false, 
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'success' => true, 
            'data' => $order
        ], 200);
    }
    catch(Exception $e){
        return response()->json([
            'success' => false, 
            'message' => "An error occured. " . $e->getMessage()
        ], 500);
    }

}
}