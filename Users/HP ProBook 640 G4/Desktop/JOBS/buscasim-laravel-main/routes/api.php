<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\CouponsController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\OptionsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
  Route::post('login',  [AuthController::class, 'login']);
  Route::post('forgot', [AuthController::class, 'forgot']);
  Route::get('verify/{token}',  [AuthController::class, 'verify']);
  Route::post('reset',  [AuthController::class, 'reset']);
  Route::post('refresh', [AuthController::class, 'refresh']);
});

Route::prefix('search')->group(function () {
  Route::post('/', [SearchController::class, 'search']);
  Route::get('info', [SearchController::class, 'info']);

});

Route::prefix('coupons')->group(function () {
  Route::get('search/{code}', [CouponsController::class, 'search']);
});

Route::prefix('contacts')->group(function () {
  Route::post('/', [ContactsController::class, 'store']);
});

Route::prefix('orders')->group(function () {
  Route::post('process', [OrdersController::class, 'process']);
  Route::post('callback', [OrdersController::class, 'callback']);
  Route::post('{orderId}/favorite', [OrdersController::class, 'addToFavorites']);
  Route::delete('{orderId}/favorite', [OrdersController::class, 'removeFromFavorites']);
});

Route::prefix('customers')->group(function () {
  Route::post('login', [CustomersController::class, 'login']);
});

Route::prefix('pages')->group(function () {
  Route::get('/{slug}/content', [PagesController::class, 'getPageBySlug']);
});

// Route::middleware('auth:api', 'admin')->prefix('settings')->group(function () {
  Route::prefix('settings')->group(function () {
    Route::get('fields', [SettingsController::class, 'getFieldsSettings']);
    Route::post('fields', [SettingsController::class, 'saveFieldsSettings']);
  });

Route::middleware('auth:api')->group(function () {
  Route::prefix('orders')->group(function () {
    Route::get('/',     [OrdersController::class, 'index']);
    Route::get('/{id}', [OrdersController::class, 'detail']);
  });

  Route::prefix('auth')->group(function () {
    Route::get('me',      [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
  });

  // Admin Routes
  Route::middleware('admin')->group(function () {
    Route::prefix('coupons')->group(function () {
      Route::get('/',         [CouponsController::class, 'index']);
      Route::post('/',        [CouponsController::class, 'store']);
      Route::put('/{id}',     [CouponsController::class, 'update']);
      Route::delete('/{id}',  [CouponsController::class, 'destroy']);
    });

    Route::prefix('users')->group(function () {
      Route::get('/',         [UsersController::class, 'index']);
      Route::post('/',        [UsersController::class, 'store']);
      Route::put('/{id}',     [UsersController::class, 'update']);
      Route::delete('/{id}',  [UsersController::class, 'destroy']);
    });

    Route::prefix('contacts')->group(function () {
      Route::get('/', [ContactsController::class, 'index']);
      Route::delete('/{id}', [ContactsController::class, 'destroy']);
    });

    Route::prefix('pages')->group(function () {
      Route::post('/create', [PagesController::class, 'create']);
      Route::delete('/delete/{id}', [PagesController::class, 'delete']);
      Route::get('/', [PagesController::class, 'index']);
      Route::get('/{id}', [PagesController::class, 'detail']);
      Route::put('/{id}', [PagesController::class, 'update']);
    });

    Route::prefix('options')->group(function () {
      Route::get('/',       [OptionsController::class, 'index']);
      Route::get('/{key}',  [OptionsController::class, 'getOption']);
      Route::patch('/',     [OptionsController::class, 'update']);
    });
  });
});
