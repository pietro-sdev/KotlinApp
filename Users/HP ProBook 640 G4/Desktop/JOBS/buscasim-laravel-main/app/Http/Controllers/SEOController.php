<?php

namespace App\Http\Controllers;

use App\Traits\Helpers;

class SEOController extends Controller
{
  use Helpers;

  /**
   * Makes React SPA SEO friendly.
   *
   * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
   */
  public function index()
  {
    $meta = [
      'title'       => env('APP_NAME'),
      'description' => env('APP_DESCRIPTION'),
      'url'         => env('APP_URL'),
      'image'       => asset('cover.jpeg'),
      'google_tag'  => $this->getOption('GOOGLE_TAG_ID')
    ];

    return view('index', ['meta' => $meta]);
  }
}
