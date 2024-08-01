<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ForgotRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ResetRequest;
use App\Mail\ResetEmail;
use App\Models\ResetTokens;
use App\Models\User;
use App\Services\AuthService;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
  /**
   * The auth service.
   *
   * @var AuthService
   */
  private AuthService $service;

  /**
   * Create a new controller instance.
   *
   * @param AuthService $service
   *
   * @return AuthController
   */
  public function __construct(AuthService $service)
  {
    $this->service = $service;
  }

  /**
   * Authenticate the user and returns a JWT access token.
   *
   * @param LoginRequest $request
   * @param AuthService $service
   *
   * @return JsonResponse
   */
  public function login(LoginRequest $request)
  {
    try {
      $credentials = $request->only('email', 'password');
      $token = $this->service->getAuthToken($credentials);

      return response()->json([
        'token' => $token
      ]);
    } catch (Exception $e) {
      return response()->json([
        'message' => $e->getMessage()
      ], 401);
    }
  }

  /**
   * Revoke the user's current JWT token.
   *
   * @return JsonResponse
   */
  public function logout()
  {
    $this->service->invalidateAuthToken();

    return response()->json(null, 204);
  }

  /**
   * Refresh the user JWT token.
   *
   * @return JsonResponse
   */
  public function refresh()
  {
    return response()->json([
      'token' => $this->service->refreshAuthToken()
    ]);
  }

  /**
   * Sends a email for user reset password.
   *
   * @param ForgotRequest $request
   * @return JsonResponse
   */
  public function forgot(ForgotRequest $request)
  {
    $token = Str::random(32);
    $result['message'] = 'E-mail de recuperação enviado com sucesso.';

    if (env('APP_ENV') == 'testing') {
      $result['token'] = $token;
    }

    ResetTokens::where('email', '=', $request->email)->delete();
    ResetTokens::insert([
      'email'       => $request->email,
      'token'       => $token,
      'created_at'  => Carbon::now()->addDays(3)->toDateString()
    ]);

    Mail::to($request->email)->send(new ResetEmail($token));

    return response()->json($result);
  }

  /**
   * Verify the token for reset user password.
   *
   * @param string $token
   * @return JsonResponse
   */
  public function verify(string $token)
  {
    $message = 'O código de verificação informado não existe ou está expirado';
    $token_exists = ResetTokens::where('token', '=', $token)->first();

    if (!$token_exists) {
      return response()->json([
        'message' => $message
      ], 404);
    }

    $expire_date = Carbon::parse($token_exists->created_at);

    if ($expire_date->diffInDays(Carbon::now()) < 1) {
      return response()->json([
        'message' => $message
      ], 404);
    }

    return response()->json(null, 204);
  }

  /**
   * Reset the user password.
   *
   * @param ResetRequest $request
   * @return JsonResponse
   */
  public function reset(ResetRequest $request)
  {
    try {
      $reset_token = ResetTokens::where('token', '=', $request->token)->first();
      $user = User::where('email', '=', $reset_token->email)->first();
      $hashed_password = Hash::make($request->password);

      $user->update([
        'password'  => $hashed_password
      ]);

      $auth_token = $this->service->getAuthToken([
        'email'     => $user->email,
        'password'  => $request->password
      ]);

      ResetTokens::where('token', '=', $request->token)->delete();

      return response()->json([
        'token' => $auth_token,
      ]);
    } catch (Exception $e) {
      return response()->json([
        'message' => $e->getMessage(),
      ], 401);
    }
  }

  /**
   * Get the current user info.
   *
   * @return JsonResponse
   */
  public function me()
  {
    return Auth::guard('api')->user();
  }
}
