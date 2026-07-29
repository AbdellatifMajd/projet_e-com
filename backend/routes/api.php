<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix("auth")->group(function () {
    Route::post("/register", [AuthController::class, "register"]);
    Route::post("/login", [AuthController::class, "login"]);
    Route::post("/logout", [AuthController::class, "logout"]);
    
    Route::middleware('auth:sanctum')->get('/checkAuth', function (Request $request) {
        return response()->json(['user' => $request->user()]);
    });
});


Route::prefix("admin/products")->group(function(){
    Route::get('/fetchAll', [ProductController::class, 'index']);      
    Route::post('/add', [ProductController::class, 'store']);     
    Route::get('/{id}', [ProductController::class, 'show']);   
    Route::put('/update/{id}', [ProductController::class, 'update']); 
    Route::delete('/delete/{id}', [ProductController::class, 'destroy']);
    Route::post('/upload-image', [ProductController::class, 'uploadImage']);
});