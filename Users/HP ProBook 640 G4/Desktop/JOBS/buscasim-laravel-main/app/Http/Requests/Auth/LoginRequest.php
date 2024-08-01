<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'email'     => 'required|string|email|exists:users,email',
      'password'  => 'required|string|min:8',
    ];
  }

  /**
   * Get the validation messages that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function messages(): array
  {
    return [
      'email' => [
        'required' => 'Campo obrigatório',
        'string' => 'Campo inválido',
        'email' => 'Informe um e-mail válido',
        'exists' => 'Usuário ou senha inválidos'
      ],
      'password' => [
        'required' => 'Campo obrigatório',
        'string' => 'Campo inválido',
        'min' => 'A senha deve ter no mínimo 8 caracteres'
      ],
    ];
  }
}
