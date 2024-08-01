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
    Schema::table('orders', function (Blueprint $table) {
      $table->foreign('user_id', 'order_user')->references('id')->on('users')->onDelete('cascade');
      $table->foreign('coupon_id', 'order_coupon')->references('id')->on('coupons')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('orders', function (Blueprint $table) {
      $table->dropForeign('order_user');
      $table->dropForeign('order_coupon');
    });
  }
};
