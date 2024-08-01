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
      Schema::create('permissions', function (Blueprint $table) {
        $table->id();
        $table->boolean('orders')->default(false);
        $table->boolean('coupons')->default(false);
        $table->boolean('contacts')->default(false);
        $table->boolean('users')->default(false);
        $table->boolean('pages')->default(false);
        $table->boolean('settings')->default(false);
        $table->boolean('visible_fields')->default(false);
        $table->foreignId('user_id');
        $table->timestamps();
      });
    }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('permissions');
  }
};
