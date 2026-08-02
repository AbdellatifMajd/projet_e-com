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
    try {
        $validated = $request->validate([
            'title' => "required|string|max:255",
            'description' => "nullable|string",
            'price' => "required|numeric|min:0",
            'discount' => "nullable|numeric|min:0|max:100",
            'totalStock' => "required|integer|min:0",
            'image' => "required|string|url", 
        ]);

        $price = $validated['price'];
        $discount = $validated['discount'] ?? 0;
        $salePrice = $price - ($price * $discount / 100);

        $product = Product::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'price' => $price,
            'salePrice' => $salePrice,
            'totalStock' => $validated['totalStock'],
            'imageUrl' => $validated['image'] ?? null,
        ]);

        return response()->json([
            "message" => "Product created successfully",
            "product" => $product,
        ], 201);

    } 
    catch (Exception $e) {
        return response()->json(['message' => 'Failed to add a new product', 'error' => $e->getMessage()], 400);
    }
    }

// Upload image vers Cloudinary
public function uploadImage(Request $request){
    try {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        // Upload sur Cloudinary
        $uploadedFile = $request->file('image')->storeOnCloudinary('products');

        return response()->json([
            'imageUrl' => $uploadedFile->getSecurePath(),
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Cloudinary upload failed',
            'error' => $e->getMessage()
        ], 500);
    }
}

    // modifier un produit 
public function update(Request $request, int $id){
    $product = Product::find($id); 
    if (!$product) {
        return response()->json([
            "message" => "Product not found" 
        ], 404);
    }

    try {
        $validatedProducts = $request->validate([
            'title' => "required|string|max:255", 
            'description' => "nullable|string", 
            'price' => "required|numeric|min:0", 
            'salePrice' => "nullable|numeric|min:0", 
            'totalStock' => "required|integer|min:0", 
            'imageUrl' => "nullable|string",
            'category' => "nullable|string|max:255", 
            'brand' => "nullable|string|max:255"
        ]);

        $product->update($validatedProducts);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product 
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'An error occurred while updating product',
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



public function getFilteredProducts(Request $request){
    try {
        $category = $request->query('category', '');
        $sortBy = $request->query('sortBy', 'price-lowtohigh');

        $query = Product::query();

        if (!empty($category)) {
            $keywords = explode(',', $category);

            $query->where(function ($q) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $q->orWhere('title', 'LIKE', '%' . trim($keyword) . '%');
                }
            });
        }

        switch ($sortBy) {
            case 'price-lowtohigh':
                $query->orderBy('price', 'asc');
                break;
            case 'price-hightolow':
                $query->orderBy('price', 'desc');
                break;
            case 'title-atoz':
                $query->orderBy('title', 'asc');
                break;
            case 'title-ztoa':
                $query->orderBy('title', 'desc');
                break;
            default:
                $query->orderBy('price', 'asc');
                break;
        }

        $products = $query->get();

        return response()->json([
            'success' => true,
            'data' => $products,
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Some error occured: ' . $e->getMessage(),
        ], 500);
    }
}

    public function getProductDetails($id){
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found!',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $product,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Some error occured',
            ], 500);
        }
    }



        }