<?php

namespace App\Http\Requests\Pages;

use Illuminate\Foundation\Http\FormRequest;

class CreatePageRequest extends FormRequest
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
      'title' => 'required|string',
      'description' => 'required|string',
      'slug' => 'required|string|unique:pages,slug',
      'content' => 'nullable|string',
      'is_published' => 'boolean'
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
      'title' => [
        'required' => 'Campo obrigatório',
        'string' => 'Campo inválido',
      ],
      'description' => [
        'required' => 'Campo obrigatório',
        'string' => 'Campo inválido',
      ],
      'slug' => [
        'required' => 'Campo obrigatório',
        'string' => 'Campo inválido',
        'unique' => 'Já existe uma página com esse endereço',
      ],
      'content' => [
        'string' => 'Campo inválido',
      ],
      'is_published' => [
        'boolean' => 'Campo inválido',
      ],
    ];
  }
}
