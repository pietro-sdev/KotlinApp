<?php

namespace App\Http\Requests\Pages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageRequest extends FormRequest
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
      'slug' => [
        'required',
        'string',
        Rule::unique('pages','slug')->ignore($this->id)

    ],
      'content' => 'nullable|json',
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
        'required'=> 'O campo Slug é obrigatório',
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
