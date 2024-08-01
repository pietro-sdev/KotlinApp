<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactCreateRequest extends FormRequest
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
      'name'          => 'required|string',
      'email'         => 'required|email',
      'phone'         => 'required|string',
      'subject'       => 'required|string',
      'message'       => 'required|string'
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
      'name' => [
        'required' => 'Informe o seu nome',
        'string' => 'Informe um nome válido'
      ],
      'email' => [
        'required' => 'Informe o seu e-mail',
        'email' => 'Informe um e-mail válido'
      ],
      'phone' => [
        'required' => 'Informe o seu telefone',
        'string' => 'Informe um telefone válido'
      ],
      'subject' => [
        'required' => 'Informe o motivo do contato',
        'string' => 'Informe um motivo válido'
      ],
      'message' => [
        'required' => 'Informe qual a sua dúvida',
        'string' => 'Informe uma mensagem válida'
      ],
    ];
  }
}
