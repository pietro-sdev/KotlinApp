<?php

namespace App\Services;

use App\Traits\Helpers;
use Illuminate\Support\Facades\Log;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\MercadoPagoConfig;

class PaymentService
{
  use Helpers;

  /**
   * Create a new Payment on External Gateway.
   *
   * @param array $data
   * @return array|null
   */
  public function payment(array $data)
  {
    MercadoPagoConfig::setAccessToken($this->getOption('MERCADO_PAGO_ACCESS_TOKEN'));

    if (env('APP_ENV') == 'development') {
      $notification_url = "https://webhook.site/395822bf-a1b7-4e5c-9d88-9c4da1507946";
    } else {
      $notification_url = env("PAYMENT_CALLBACK_URL");
    }

    $client = new PaymentClient();
    $total = (float) $data['total'];

    try {
      $request = [
        "transaction_amount" => $total < 0 ? 0 : $total,
        "description" => "BuscaSim - Consulta Premium da placa " . $data['plate'],
        "installments" => 1,
        "payment_method_id" => "pix",
        "notification_url" => $notification_url,
        "payer" => [
          "email" => $data['email'],
          "first_name" => $data['name'],
          "last_name" => "",
          "identification" => [
            "type" => "cpf",
            "number" => $data['document']
          ]
        ]
      ];

      $payment = $client->create($request);

      return [
        'transaction_id' => $payment->id,
        'qrcode'         => $payment->point_of_interaction->transaction_data->qr_code_base64,
        'code'           => $payment->point_of_interaction->transaction_data->qr_code,
      ];
    } catch (MPApiException $e) {
      Log::error('Error on Mercado Pago API: {error}', ['error' => $e->getApiResponse()->getContent()]);
      return null;
    } catch (\Exception $e) {
      Log::error('Error on generate payment: {error}', ['error' => $e->getMessage()]);
      return null;
    }
  }

  /**
   * Verify if payment from gateway is confirmed.
   *
   * @param string $payment_id
   * @return bool
   */
  public function confirmed(string $payment_id)
  {
    MercadoPagoConfig::setAccessToken($this->getOption('MERCADO_PAGO_ACCESS_TOKEN'));

    try {
      $client = new PaymentClient();
      $payment = $client->get($payment_id);

      if (env('APP_ENV') == 'development') {
        Log::info('Mercado Pago payment data: {data}', ['data' => $payment]);
        return true;
      }

      if ($payment->status == 'approved') {
        return true;
      }
    } catch (MPApiException $e) {
      Log::error('Error on Mercado Pago API: {error}', ['error' => $e->getApiResponse()->getContent()]);
    } catch (\Exception $e) {
      Log::error('Error on process payment callback: {error}', ['error' => $e->getMessage()]);
    }

    return false;
  }
}
