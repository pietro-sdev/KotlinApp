<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PageSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $jsonPath = base_path('database/seeders/json/defalt-pages.json');
    $jsonContent = file_get_contents($jsonPath);
    $data = json_decode($jsonContent, true);

    DB::table('pages')->insert([
      [
        'title' => 'Home',
        'description' => 'Realize consultas rápidas de placas de veículos e receba informações detalhadas instantaneamente.',
        'slug' => '/',
        'content' => json_encode($data['home']),
        'is_published' => true,
      ],
      [
        'title' => 'Perguntas Frequentes',
        'description' => 'Encontre respostas rápidas e precisas para suas dúvidas sobre consultas de placas de veículos. Tire suas dúvidas agora!',
        'slug' => '/perguntas-frequentes',
        'content' => json_encode($data['faq']),
        'is_published' => true,
      ],
      [
        'title' => 'Contato',
        'description' => 'Entre em contato conosco para mais informações sobre consultas de placas de veículos. Estamos aqui para ajudar!',
        'slug' => '/contato',
        'content' => json_encode($data['contact']),
        'is_published' => true,
      ],
      [
        'title' => 'Política de Privacidade',
        'description' => 'Leia nossa política de privacidade para entender como protegemos suas informações durante consultas de placas de veículos.',
        'slug' => '/politica-de-privacidade',
        'content' => json_encode($data['privacy-policy']),
        'is_published' => true,
      ],
      [
        'title' => 'Muito Obrigado',
        'description' => 'Agradecemos por escolher nossos serviços para consultas de placas de veículos. Seu suporte é muito valioso para nós!',
        'slug' => '/muito-obrigado',
        'content' => json_encode($data['thanks']),
        'is_published' => true,
      ],
      [
        'title' => 'Termos De Uso',
        'description' => 'Leia nossos termos de uso antes de utilizar nossos serviços de consulta de placas de veículos. Proteja-se, conheça seus direitos!',
        'slug' => '/termos-de-uso',
        'content' => json_encode($data['terms']),
        'is_published' => true,
      ],
      [
        'title' => 'Resultados',
        'description' => 'Veja aqui os resultados organizados de forma clara e acessível.',
        'slug' => '/resultados',
        'content' => json_encode($data['results']),
        'is_published' => true,
      ],
    ]);
  }
}
