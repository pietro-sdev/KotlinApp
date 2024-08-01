<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CustomersController extends Controller
{
  /**
   * Handles the customer login by e-mail and cpf to returns a JWT token.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email'     => 'required|string|email|exists:users,email',
      'document'  => 'required|cpf',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $credentials = [
      'email'    => $request->email,
      'password' => $request->document,
    ];

    $token = Auth::guard('api')->attempt($credentials);

    if (!$token) {
      return response()->json(['message' => 'E-mail ou CPF inválidos'], 400);
    }

    return response()->json([
      'token' => $token
    ]);
  }
}
