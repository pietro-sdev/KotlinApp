<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOptionsRequest extends FormRequest
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
      'options'         => 'required|array',
      'options.*.key'   => 'required|string|exists:options,key',
      'options.*.value' => 'required',
    ];
  }

  public function messages(): array
  {
    return [
      'options.*.value' => [
        'required' => 'Campo Obrigatório'
      ]
    ];
  }
}
