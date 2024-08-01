<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
  /**
   * Using timestamps.
   *
   * @var boolean
   */
  public $timestamps = false;

  /**
   * The table name.
   *
   * @var string
   */
  protected $table = "options";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'key',
    'value',
  ];
}
