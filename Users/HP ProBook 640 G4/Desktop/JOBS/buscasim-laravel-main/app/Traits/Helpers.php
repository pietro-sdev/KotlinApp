<?php

namespace App\Traits;

use App\Models\Option;

trait Helpers
{

  protected function getOption(string $key, $default = null)
  {
    $option = Option::where('key', '=', $key)->first();

    if (!$option) return $default;

    return $option->value;
  }

  /**
   * Update a system option and returns false if an error occurs.
   *
   * @param string $key
   * @param mixed $value
   * @return bool
   */
  protected function setOption(string $key, mixed $value)
  {
    if (!$key || !$value) return false;

    $option = Option::where('key', '=', $key)->first();

    if (!$option) return false;

    $option->value = $value;
    $option->save();

    return true;
  }
}
