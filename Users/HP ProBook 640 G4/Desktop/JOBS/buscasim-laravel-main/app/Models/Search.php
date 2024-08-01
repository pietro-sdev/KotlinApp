<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Search extends Model
{
  use SoftDeletes;
  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "searches";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'remote_ip',
    'plate',
  ];
}
