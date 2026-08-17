<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cart_id', 
       ' address_id', 
       'address', 
       'city', 
       'pincode', 
       'phone', 
       'notes',
        'order_status', 
        'payment_method', 
        'payment_status', 
        'total_amount',
        'order_date', 
        'order_update_date', 
        'payment_id', 
        'payer_id',
    ];
        
    protected $casts = [
            'order_date' => 'datetime',
            'order_updated_date' => 'datetime', 
            'total_amount' => 'decimal:2'
    ];

    public function items(): HasMany{
        return $this->hasMany(OrderItem::class);
    }


    }