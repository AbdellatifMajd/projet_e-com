<?php

namespace App\Http\Controllers;
use App\Models\Cart;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //

    public function index(Request $request){
   try{
        $cart = Cart::with('items.product')->where("user_id", $request->userId)->first();

        if (!$cart) {
                return response()->json([
                    'success' => true,
                    'data'    => null,
                    'message' => 'Your cart empty',
                ], 200);
            }

            return response()->json([
                'success' => true,
                'data'    => $cart,
            ], 200);
   }
   catch(Exception $e){
    return response()->json([
        'success' => false, 
        'error' => $e->getMessage()
    ]);
   }
    }


public function store(Request $req){
    $validated = $req->validate([
        'userId' => "required|integer|exists:users,id",
        'productId' => "required|integer|exists:products,id"
    ]);

    try{
        $product = Product::find($validated['productId']);
        if(!$product){
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }

        $cart = Cart::firstOrCreate(['user_id' => $validated['userId']]);
        $cartItem = $cart->items()->where('product_id', $validated['productId'])->first();

        if($cartItem){
            // Le produit est déjà dans le panier : on incrémente de 1
            $cartItem->increment("quantity");
        }
        else{
            // Premier ajout : quantité par défaut à 1
            $cart->items()->create([
                'product_id' => $validated['productId'],
                'user_id' => $validated['userId'],
                'quantity' => 1
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $cart->load("items.product"),
            'message' => "Added to cart"
        ], 200);
        

    }
    catch(Exception $e){
        return response()->json([
            'success' => false, 
            'message' => $e->getMessage()
        ], 500);
    }
}

public function destroy($userId, $productId){
    try {
        // 1. Récupération du panier de l'utilisateur
        $cart = Cart::where('user_id', $userId)->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found',
            ], 404);
        }

        // 2. Recherche de l'élément dans le panier
        $cartItem = $cart->items()->where('product_id', $productId)->first();

        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found in cart',
            ], 404);
        }

        // 3. Suppression de l'élément
        $cartItem->delete();

        // 4. Retour de la réponse avec le panier rechargé
        return response()->json([
            'success' => true,
            'data'    => $cart->load('items.product'),
            'message' => 'Removed from cart',
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}
}
