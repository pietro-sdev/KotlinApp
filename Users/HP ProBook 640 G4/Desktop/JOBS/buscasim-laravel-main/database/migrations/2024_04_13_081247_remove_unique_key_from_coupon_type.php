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
    Schema::table('coupons', function (Blueprint $table) {
      $table->enum('type', ['fixed', 'percentage'])->change();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('coupons', function (Blueprint $table) {
      $table->enum('type', ['fixed', 'percentage'])->unique()->change();
    });
  }
};
