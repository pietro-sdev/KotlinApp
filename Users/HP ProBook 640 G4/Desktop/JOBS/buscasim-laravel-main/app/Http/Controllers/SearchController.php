<?php

namespace App\Http\Controllers;

use App\Models\Search;
use App\Traits\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class SearchController extends Controller
{
    use Helpers;

    /**
     * Search a vehicle plate and returns the free information.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request)
    {
        // Validate the request.
        $validator = Validator::make($request->all(), [
            'plate' => 'required|string',
        ], []);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Save the free search
        // Search::create([
        //   'remote_ip' => $request->ip(),
        //   'plate' => $request->plate
        // ]);

        // Returns mock JSON data if is in development.
        if (env('APP_ENV') == 'development') {
            $mock = file_get_contents(base_path('resources/json/free_response.json'));

            return response()->json(json_decode($mock), 200);
        }

        // Remove the hyphen from the plate value.
        $plate = str_replace('-', '', $request->plate);

        // Make an API request to get free vehicles information.
        $response = Http::post('https://api-v2.anycar.com.br/integracao/consultar', [
            'apiKey' => env('API_KEY_ANYCAR'),
            'tipo' => 'agregados-propria',
            'placa' => $plate,
        ]);

        if ($response->failed()) {
            return response()->json(json_decode($response->body()), 400);
        }

        return response()->json(json_decode($response->body()), 200);
    }

    /**
     * Get information about search.
     *
     * @return JsonResponse
     */
    public function info()
    {
        return response()->json([
            'price' => (float) $this->getOption('BASE_PRICE', 12.90)
        ]);
    }
}
