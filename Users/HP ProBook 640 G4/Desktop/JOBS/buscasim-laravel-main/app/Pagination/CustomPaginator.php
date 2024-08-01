<?php

namespace App\Pagination;

use Illuminate\Pagination\LengthAwarePaginator;

class CustomPaginator extends LengthAwarePaginator
{
  /**
   * Get the instance as an array.
   *
   * @return array
   */
  public function toArray()
  {
    return [
      'items' => $this->items->toArray(),
      'pagination' => [
        'total'     => $this->total(),
        'count'     => $this->count(),
        'per_page'  => $this->perPage(),
        'current'   => $this->currentPage(),
        'last_page' => $this->lastPage(),
      ],
    ];
  }
}
