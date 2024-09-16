<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
  use HasFactory, Notifiable, SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'role',
    'document',
    'accept_terms',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'password' => 'hashed',
  ];

  /**
   * Get the user JWT identifier.
   */
  public function getJWTIdentifier()
  {
    return $this->getKey();
  }

  /**
   * Custom the claims for user in JWT.
   */
  public function getJWTCustomClaims()
  {
    return [
      'name'      => $this->name,
      'email'     => $this->email,
      'document'  => $this->document,
      'role'      => $this->role,
    ];
  }

  public function orders()
  {
    return $this->hasMany(Order::class, 'user_id', 'id');
  }
}
