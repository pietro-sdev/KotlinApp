<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('users')->insert([
      [
        'name'      => 'Administrador',
        'email'     => 'admin@email.com',
        'password'  => Hash::make('asdf1234'),
        'role'      => 'admin'
      ],
      [
        'name'      => 'Cliente Teste',
        'email'     => 'cliente@email.com',
        'password'  => Hash::make('123.456.789-09'),
        'role'      => 'user'
      ]
    ]);
  }
}
