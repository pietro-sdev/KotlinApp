<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
  use SoftDeletes;
  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "contacts";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'phone',
    'subject',
    'message',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'created_at' => 'date',
    'updated_at' => 'date',
  ];
}
