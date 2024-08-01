<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FieldSetting;

class SettingsController extends Controller
{
  /**
   * Get the fields visibility settings.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function getFieldsSettings()
  {
    // Campos padrão com visibilidade inicial
    $defaultSettings = [
      'fabricante' => true,
      'uf_faturado' => true,
      'modelo' => false,
      'origem' => false,
      'uf_jurisdicao' => true,
      'chassi' => true,
      'cor' => true,
      'capacidade_max_tracao' => true,
      'cilindradas' => true,
      'combustivel' => true,
      'numero_motor' => true,
      'cidade' => true,
      'quantidade_eixo' => true,
      'especie' => true,
      'nacionalidade' => true,
      // Campos adicionais
      'ano_fabricacao' => true,
      'ano_modelo' => true,
      'quantidade_lugares' => true,
      'SUBMODELO' => true,
      'tipo_doc_prop' => true,
      'segmento' => true,
      'sub_segmento' => true,
      'tipo_carroceria' => true,
      'tipo_doc_faturado' => true,
      'placa' => true,
      'placa_alternativa' => false,
      'marcaModelo' => true,
      'nome_proprietario' => true,
      'endereco_proprietario' => true,
      'doc_proprietario' => true,
    ];

    // Recupera as configurações do banco de dados
    $settingsFromDb = FieldSetting::all()->pluck('is_visible', 'field')->toArray();

    // Mescla as configurações do banco de dados com as padrão
    $settings = array_merge($defaultSettings, $settingsFromDb);

    return response()->json($settings, 200);
  }

  /**
   * Save the fields visibility settings.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function saveFieldsSettings(Request $request)
  {
    // Validações para todos os campos
    $settings = $request->validate([
      'fabricante' => 'required|boolean',
      'uf_faturado' => 'required|boolean',
      'modelo' => 'required|boolean',
      'origem' => 'required|boolean',
      'uf_jurisdicao' => 'required|boolean',
      'chassi' => 'required|boolean',
      'cor' => 'required|boolean',
      'capacidade_max_tracao' => 'required|boolean',
      'cilindradas' => 'required|boolean',
      'combustivel' => 'required|boolean',
      'numero_motor' => 'required|boolean',
      'cidade' => 'required|boolean',
      'quantidade_eixo' => 'required|boolean',
      'especie' => 'required|boolean',
      'nacionalidade' => 'required|boolean',
      // Campos adicionais
      'ano_fabricacao' => 'required|boolean',
      'ano_modelo' => 'required|boolean',
      'quantidade_lugares' => 'required|boolean',
      'SUBMODELO' => 'required|boolean',
      'tipo_doc_prop' => 'required|boolean',
      'segmento' => 'required|boolean',
      'sub_segmento' => 'required|boolean',
      'tipo_carroceria' => 'required|boolean',
      'tipo_doc_faturado' => 'required|boolean',
      'placa' => 'required|boolean',
      'placa_alternativa' => 'required|boolean',
      'marcaModelo' => 'required|boolean',
      'nome_proprietario' => 'required|boolean',
      'endereco_proprietario' => 'required|boolean',
      'doc_proprietario' => 'required|boolean',
    ]);

    foreach ($settings as $field => $is_visible) {
      FieldSetting::updateOrCreate(
        ['field' => $field],
        ['is_visible' => $is_visible]
      );
    }

    return response()->json(['message' => 'Configurações salvas com sucesso'], 200);
  }
}
