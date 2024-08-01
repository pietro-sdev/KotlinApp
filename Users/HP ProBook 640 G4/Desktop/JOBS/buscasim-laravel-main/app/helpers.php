<?php

if (!function_exists('vite_assets')) {
  function vite_assets($directory)
  {
      $path = public_path($directory);
      $assets = [];

      if (file_exists($path)) {
          $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
          foreach ($files as $file) {
              if ($file->isFile()) {
                  $filePath = str_replace(public_path(), '', $file->getRealPath());
                  $assets[] = asset($filePath);
              }
          }
      }

      return $assets;
  }
}
