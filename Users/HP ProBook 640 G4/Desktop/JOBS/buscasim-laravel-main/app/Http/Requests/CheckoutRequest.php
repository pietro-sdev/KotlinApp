<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
      'document'      => 'required|cpf',
      'accept_terms'  => 'required|boolean',
      'plate'         => 'required|formato_placa_de_veiculo',
      'coupon_id'     => 'nullable|exists:coupons,id',
    ];
  }
}
