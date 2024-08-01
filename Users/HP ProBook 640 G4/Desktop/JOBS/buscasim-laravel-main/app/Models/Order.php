<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
  use SoftDeletes;
  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "orders";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'total',
    'status',
    'plate',
    'transaction_id',
    'data',
    'user_id',
    'coupon_id',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'transaction_id',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'total' => 'double',
    'created_at' => 'date',
    'updated_at' => 'date',
    'data' => 'object',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function coupon()
  {
    return $this->belongsTo(Coupon::class);
  }
}
