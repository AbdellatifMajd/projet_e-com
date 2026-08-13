<?php
// database/migrations/xxxx_xx_xx_create_orders_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('cart_id')
                ->nullable()
                ->constrained('carts')
                ->nullOnDelete()
                ->cascadeOnUpdate();

            // addressInfo 
            $table->string('address_id')->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('pincode')->nullable();
            $table->string('phone')->nullable();
            $table->text('notes')->nullable();

            $table->string('order_status')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_status')->nullable();
            $table->decimal('total_amount', 12, 2)->default(0);

            $table->dateTime('order_date')->nullable();
            $table->dateTime('order_update_date')->nullable();

            $table->string('payment_id')->nullable();
            $table->string('payer_id')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};