<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends Model
{
  use SoftDeletes;
  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "coupons";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'code',
    'type',
    'amount',
    'expiration',
  ];
}
