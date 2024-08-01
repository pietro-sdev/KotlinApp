<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ResetRequest extends FormRequest
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
      'password'  => 'required|string|min:8|confirmed',
      'token'     => 'required|exists:password_reset_tokens,token',
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
      'password'  => [
        'required' => 'Campo obrigatório',
        'string' => 'Campo inválido',
        'min' => 'A senha precisa ter no mínimo 8 caracteres',
        'confirmed' => 'As senhas não são iguais',
      ],
      'token' => [
        'required' => 'Campo obrigatório',
        'exists' => 'O código de verificação informado não existe',
      ],
    ];
  }
}
