<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

/**
     * Les attributs qui peuvent être assignés en masse (Mass Assignment).
     * Définit les champs autorisés lors de l'utilisation de Product::create() ou $product->update().
     *
     * @var array<int, string>
*/
    
protected $fillable = [
        'title',
        'imageUrl',
        'description',
        'category',
        'price',
        'salePrice',
        'totalStock',
    ];
}
