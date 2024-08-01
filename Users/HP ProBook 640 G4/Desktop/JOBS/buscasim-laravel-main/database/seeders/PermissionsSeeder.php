<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      DB::table('permissions')->insert([
        [
          'orders'   => '1',
          'pages'   => '1',
          'contacts'   => '1',
          'visible_fields'   => '1',
          'settings'   => '1',
          'coupons'   => '1',
          'users'   => '1',
          'user_id' => '1',
        ],
      ]);
    }
}
