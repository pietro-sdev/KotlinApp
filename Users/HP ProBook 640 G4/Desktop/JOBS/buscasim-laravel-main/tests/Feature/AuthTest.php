<?php

namespace Tests\Feature;

use App\Models\ResetTokens;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
  use RefreshDatabase;

  /**
   * Test login request.
   */
  public function testLoginRequest(): void
  {
    $this->seed();

    $response = $this->post('/api/auth/login', [
      'email' => 'admin@email.com',
      'password' => 'asdf1234'
    ]);

    $response
      ->assertStatus(200)
      ->assertJsonStructure(['token']);
  }

  /**
   * Test logout request.
   */
  public function testLogoutRequest()
  {
    $this->seed();

    $response = $this->post('/api/auth/login', [
      'email' => 'admin@email.com',
      'password' => 'asdf1234'
    ]);

    $response->assertStatus(200);

    $response = $this->post('/api/auth/logout', [], [
      'Authorization' => 'Bearer ' . $response->json('token')
    ]);

    $response->assertStatus(204);

    $response = $this->get('/api/auth/me');

    $response->assertStatus(401);
  }

  /**
   * Test refresh token request.
   */
  public function testRefreshRequest()
  {
    $this->seed();

    $response = $this->post('/api/auth/login', [
      'email' => 'admin@email.com',
      'password' => 'asdf1234'
    ]);

    $response->assertStatus(200);

    $response = $this->post('/api/auth/refresh', [], [
      'Authorization' => 'Bearer ' . $response->json('token')
    ]);

    $response
      ->assertStatus(200)
      ->assertJsonStructure(['token']);
  }

  /**
   * Test forgot password request.
   */
  public function testForgotRequest()
  {
    $this->seed();

    $response = $this->post('/api/auth/forgot', [
      'email' => 'admin@email.com',
    ]);

    $response
      ->assertStatus(200)
      ->assertJsonStructure(['message', 'token']);
  }

  /**
   * Test verify reset token request.
   *
   * TODO: Implement verify token expired test.
   */
  public function testVerifyRequest()
  {
    $this->seed();

    $response = $this->post('/api/auth/forgot', [
      'email' => 'admin@email.com',
    ]);

    $response
      ->assertStatus(200)
      ->assertJsonStructure(['message', 'token']);

    $response = $this->get('/api/auth/verify/' . $response->json('token'));

    $response->assertStatus(204);
  }

  /**
   * Test if verify code not exists.
   */
  public function testVerifyCodeNotExistsRequest()
  {
    $this->seed();

    $response = $this->post('/api/auth/forgot', [
      'email' => 'admin@email.com',
    ]);

    $response
      ->assertStatus(200)
      ->assertJsonStructure(['message', 'token']);

    ResetTokens::where('token', '=', $response->json('token'))->delete();

    $response = $this->get('/api/auth/verify/' . $response->json('token'));

    $response
      ->assertStatus(404)
      ->assertJsonStructure(['message']);
  }

  /**
   * Test reset user password.
   */
  public function testResetRequest()
  {
    $this->seed();

    $response = $this->post('/api/auth/forgot', [
      'email' => 'admin@email.com',
    ]);

    $response
      ->assertStatus(200)
      ->assertJsonStructure(['message', 'token']);

    $response = $this->post('/api/auth/reset', [
      'password' => 'reset1234',
      'password_confirmation' => 'reset1234',
      'token' => $response->json('token'),
    ]);

    $response
      ->assertStatus(200)
      ->assertJsonStructure(['token']);

    $response = $this->post('/api/auth/login', [
      'email' => 'admin@email.com',
      'password' => 'reset1234'
    ]);

    $response
      ->assertStatus(200)
      ->assertJsonStructure(['token']);
  }
}
