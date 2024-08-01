<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      $table->decimal('total', 7, 2, true)->default(0);
      $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
      $table->string('plate');
      $table->json('data')->nullable();
      $table->json('transaction_id')->nullable();
      $table->foreignId('user_id');
      $table->foreignId('coupon_id')->nullable();
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
