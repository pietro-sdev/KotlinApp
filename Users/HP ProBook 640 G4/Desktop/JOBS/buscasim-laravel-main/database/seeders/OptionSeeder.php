<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OptionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('options')->insert([
      [
        'key'   => 'API_PLACAS_URL',
        'value' => 'https://wdapi2.com.br',
      ],
      [
        'key'   => 'API_PLACAS_TOKEN_FREE',
        'value' => '',
      ],
      [
        'key'   => 'API_PLACAS_TOKEN_PREMIUM',
        'value' => '',
      ],
      [
        'key'   => 'BASE_PRICE',
        'value' => '20.00',
      ],
      [
        'key'   => 'MERCADO_PAGO_ACCESS_TOKEN',
        'value' => 'TEST-5441779568103896-012821-6ecee8c98c84fffd2bc95656acf65bc7-723430278',
      ],
      [
        'key'   => 'GOOGLE_TAG_ID',
        'value' => '',
      ],
    ]);
  }
}
