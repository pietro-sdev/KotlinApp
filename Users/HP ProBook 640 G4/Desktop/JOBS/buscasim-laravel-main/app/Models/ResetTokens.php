<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResetTokens extends Model
{
  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "password_reset_tokens";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'email',
    'token',
    'created_at',
  ];
}
