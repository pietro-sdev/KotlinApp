<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Auth;

class AuthService
{
  /**
   * Get the JWT auth with for the given email and password.
   *
   * @param string[] $credentials
   *
   * @return string
   */
  public function getAuthToken(array $credentials)
  {
    $token = Auth::guard('api')->attempt($credentials);

    if (!$token) throw new Exception('Usuário ou senha inválidos');

    return $token;
  }

  /**
   * Refresh the JWT token and return a new.
   *
   * @return string
   */
  public function refreshAuthToken()
  {
    /**
     * @var Illuminate\Auth\AuthManager
     */
    $auth = auth('api');

    return $auth->refresh();
  }

  /**
   * Invalidate the current JWT token.
   *
   * @return void
   */
  public function invalidateAuthToken()
  {
    Auth::guard('api')->logout();
  }
}
