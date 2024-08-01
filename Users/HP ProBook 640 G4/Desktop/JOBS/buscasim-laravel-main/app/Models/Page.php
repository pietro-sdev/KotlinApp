<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
  use SoftDeletes;

  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "pages";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'title',
    'description',
    'slug',
    'content',
    'is_published',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'is_published' => 'boolean',
  ];
}
