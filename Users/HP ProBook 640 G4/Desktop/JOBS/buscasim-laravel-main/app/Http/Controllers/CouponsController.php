<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Traits\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class CouponsController extends Controller
{
  use Helpers;

  /**
   * Search and returns a coupon discount.
   */
  public function search(string $code)
  {
    $coupon = Coupon::where('code', '=', $code)
      ->whereDate('expiration', '>', Carbon::now())
      ->first();

    if (!$coupon) {
      return response()->json([
        'coupon_id' => null,
        'discount'  => 0,
        'subtotal'  => (float) $this->getOption('BASE_PRICE')
      ], 200);
    }

    $total = 0;
    $discount = 0;

    if ($coupon->type == 'fixed') {
      $discount = $coupon->amount;
      $total = $this->getOption('BASE_PRICE') - $coupon->amount;
    } else {
      $total = $this->getOption('BASE_PRICE') * (1 - $coupon->amount / 100);
      $discount = $this->getOption('BASE_PRICE') - $total;
    }

    return response()->json([
      'coupon_id' => $coupon->id,
      'discount'  => $discount,
      'subtotal'  => $total
    ], 200);
  }

  /**
   * List all coupons.
   */
  public function index(Request $request)
  {
    $query = Coupon::query();

    if ($request->has('code')) {
      $query->whereDate('code', 'like', "%{$request->code}%");
    }

    if ($request->has('type')) {
      $query->where('type', '=', $request->type);
    }

    return response()->json($query->paginate(10), 200);
  }

  /**
   * Create a new coupon.
   */
  public function store(Request $request)
  {
    // Validate the request.
    $validator = Validator::make($request->all(), [
      'code'        => 'required|unique:coupons,code',
      'type'        => 'required|in:fixed,percentage',
      'amount'      => 'required|integer|between:0,100',
      'expiration'  => 'required|date|after:tomorrow',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    Coupon::create([
      'code'        => $request->code,
      'type'        => $request->type,
      'amount'      => $request->amount,
      'expiration'  => $request->expiration,
    ]);

    return response()->json(['message' => 'Cupom criado com sucesso'], 200);
  }

  /**
   * Update a coupon.
   */
  public function update(Request $request, string $id)
  {
    $coupon = Coupon::where('id', '=', $id)->first();

    if (!$coupon) {
      return response()->json(['message' => 'Cupom não encontrado'], 40);
    }

    // Validate the request.
    $validator = Validator::make($request->all(), [
      'expiration'  => 'required|date|after:tomorrow',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $coupon->expiration = $request->expiration;
    $coupon->save();

    return response()->json(['message' => 'Cupom atualizado com sucesso'], 200);
  }

  /**
   * Remove a cupom.
   */
  public function destroy(string $id)
  {
    $coupon = Coupon::where('id', '=', $id)->first();

    if (!$coupon) {
      return response()->json(['message' => 'Cupom não encontrado'], 404);
    }

    $coupon->delete();

    return response()->json(['message' => 'Cupom removido com sucesso'], 200);
  }
}
