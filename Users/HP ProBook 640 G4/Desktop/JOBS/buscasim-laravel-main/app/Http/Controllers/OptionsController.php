<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Traits\Helpers;
use App\Http\Requests\UpdateOptionsRequest;

class OptionsController extends Controller
{
  use Helpers;

  /**
   * List all the system options.
   */
  public function index()
  {
    return response()->json(Option::all(), 200);
  }

  /**
   * Get a option by key.
   */
  public function getOption(string $key)
  {
    $option = Option::where('key', '=', $key)->first();

    if (!$option) return response()->json(false, 200);

    return response()->json($option->value, 200);
  }

  /**
   * Update the system options.
   */
  public function update(UpdateOptionsRequest $request)
  {
    foreach ($request->options as $option) {
      $this->setOption($option['key'], $option['value']);
    }

    return response()->json(['message' => 'Configurações atualizadas com sucesso.'], 200);
  }
}
