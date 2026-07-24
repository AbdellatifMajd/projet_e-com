<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //récupérer tous les produits 
    public function index(){
        $products = Product::latest()->get();
        return response()->json($products, 200);
    }

    // récupérer un seul produit 
    public function show(int $id){
        $product = Product::find($id);
        if(!$product){
            return response()->json([
                'message' => "Product not found", 
            ], 404);
        }
        return response()->json($product, 200);
    }

    // ajouter un produit 
    public function store(Request $request){
        try{
            $validatedProducts = $request->validate([
                'title' => "required|string|max:255", 
                'description' => "nullable|string", 
                'price' => "required|numeric|min:0", 
                'salePrice' => "nullable|numeric|min:0", 
                'totalStock' => "required|integer|min:0", 
                'imageUrl' => "nullable|string",
                'category' => "string|max:255", 
                'brand' => "string|max:255"
            ]);

            $product = Product::create($validatedProducts);

            return response()->json([
                "message" => "Product created successfully", 
                "product" => $product
            ], 201);
        }
        catch(Exception $e){
            return response()->json([
                'message' => 'Failed to add a new product', $e->getMessage()
            ], 400);
        }
    }

    // modifier un produit 
    public function update(Request $request, int $id){
        $product = Product::find($id); 
        if(!$product){
            return response()->json([
                "message" => "Product not found" 
            ], 404);
        }

        try{
             $validatedProducts = $request->validate([
                'title' => "required|string|max:255", 
                'description' => "nullable|string", 
                'price' => "required|numeric|min:0", 
                'salePrice' => "numeric|min:0", 
                'totalStock' => "required|integer|min:0", 
                'imageUrl' => "nullable|string",
                'category' => "string|max:255", 
                'brand' => "string|max:255"
            ]);

            $updatedProduct = Product::update($validatedProducts);
            return response()->json([
                'message' => 'Produit mis à jour avec succès',
                'product' => $updatedProduct
            ], 200);
        }

        catch(Exception $e){
            return response()->json([
                'message' => 'An error occured while updating product',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // supprimer produit
    public function destroy(int $id){
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);
    
        }
}