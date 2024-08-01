<?php

namespace App\Http\Controllers;

use App\Events\PaymentEvent;
use App\Http\Requests\CheckoutRequest;
use App\Models\Coupon;
use App\Models\Favorite;
use App\Models\Order;
use App\Models\User;
use App\Services\PaymentService;
use App\Traits\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class OrdersController extends Controller
{
    use Helpers;


    public function index(Request $request)
{
    $query = Order::query();
    $current_user = auth('api')->user();
    $is_admin = $current_user->role == 'admin';

    if ($current_user && $current_user->role != 'admin') {
        $query->where('user_id', '=', $current_user->id);
    }

    if ($request->has('date')) {
        $query->whereDate('created_at', '=', $request->date);
    }

    $query
        ->with('user:id,name')
        ->with('coupon:id,code')
        ->orderBy('created_at', 'desc');

    $orders = $query->paginate(30);

    // Iterate through all orders
    foreach ($orders as $order) {
        if (is_null($order->data) || $order->data == "{\"message\": \"Sem saldo disponivel \"}\n") {
            $vehicleResponse = $this->fetchPlateData($order->plate);
            $ownerResponse = $this->fetchOwnerData($order->plate);
            $agregadosPropriaResponse = $this->fetchAgregadosPropriaData($order->plate);

            if ($vehicleResponse->successful() && $ownerResponse->successful()) {
                $vehicleData = json_decode($vehicleResponse->body(), true);
                $ownerData = json_decode($ownerResponse->body(), true);
                $agregadosPropriaData = json_decode($agregadosPropriaResponse->body(), true);

                // Combine the data
                $combinedData = $this->uniformizeData($vehicleData['dados'], $agregadosPropriaData['dados']);
                $order->data = json_encode($combinedData);
                $order->save();
            }
        }
    }

    // Fetch favorites for the current user
    $favorites = Favorite::where('user_id', $current_user->id)
        ->pluck('order_id')
        ->toArray();

    // Add favorites status to each order
    foreach ($orders as $order) {
        $order->is_favorite = in_array($order->id, $favorites);
    }

    return response()->json($orders, 200);
}

private function fetchAgregadosPropriaData(string $plate)
{
    return Http::post('https://api-v2.anycar.com.br/integracao/consultar', [
        'apiKey' => env('API_KEY_ANYCAR'),
        'tipo' => 'agregados-propria',
        'placa' => $plate,
    ]);
}

    /**
     * Fetch vehicle data from the external API.
     *
     * @param string $plate
     * @return \Illuminate\Http\Client\Response
     */
    private function fetchPlateData(string $plate)
    {
        return Http::post('https://api-v2.anycar.com.br/integracao/consultar', [
            'apiKey' => env('API_KEY_ANYCAR'),
            'tipo' => 'estadual',
            'placa' => $plate,
        ]);
    }

    /**
     * Fetch owner data from the external API.
     *
     * @param string $plate
     * @return \Illuminate\Http\Client\Response
     */
    private function fetchOwnerData(string $plate)
    {
        return Http::post('https://api-v2.anycar.com.br/integracao/consultar', [
            'apiKey' => env('API_KEY_ANYCAR'),
            'tipo' => 'estadual',
            'placa' => $plate,
        ]);
    }


    private function uniformizeData(array $estadualData, array $agregadosPropriaData)
    {
        $combinedData = [
            'situacaoveiculo' => $estadualData['situacaoveiculo'] ?? $agregadosPropriaData['situacaoveiculo'] ?? null,
            'placa' => $estadualData['placa'] ?? $estadualData['placaMercosul'] ?? $agregadosPropriaData['placa'] ?? $agregadosPropriaData['placaMercosul'] ?? null,
            'municipio' => $estadualData['municipio'] ?? $estadualData['cidade'] ?? $agregadosPropriaData['municipio'] ?? $agregadosPropriaData['cidade'] ?? null,
            'uf' => $estadualData['uf'] ?? $estadualData['estado'] ?? $agregadosPropriaData['uf'] ?? $agregadosPropriaData['estado'] ?? null,
            'renavam' => $estadualData['renavam'] ?? $agregadosPropriaData['renavam'] ?? null,
            'cpf_cnpj_proprietario' => $estadualData['cpf_cnpj_proprietario'] ?? $agregadosPropriaData['cpf_cnpj_proprietario'] ?? null,
            'tipodocumentoproprietario' => $estadualData['tipodocumentoproprietario'] ?? $agregadosPropriaData['tipodocumentoproprietario'] ?? null,
            'pronome' => $estadualData['pronome'] ?? $agregadosPropriaData['pronome'] ?? null,
            'licdata' => $estadualData['licdata'] ?? $agregadosPropriaData['licdata'] ?? null,
            'dataemissaocrv' => $estadualData['dataemissaocrv'] ?? $agregadosPropriaData['dataemissaocrv'] ?? null,
            'chassi' => $estadualData['chassi'] ?? $agregadosPropriaData['chassi'] ?? null,
            'tipodocumentofaturado' => $estadualData['tipodocumentofaturado'] ?? $agregadosPropriaData['tipodocumentofaturado'] ?? null,
            'cpfcnpjfaturado' => $estadualData['cpfcnpjfaturado'] ?? $agregadosPropriaData['cpfcnpjfaturado'] ?? null,
            'uffaturado' => $estadualData['uffaturado'] ?? $agregadosPropriaData['uffaturado'] ?? null,
            'marcamodelocompleto' => $estadualData['marcamodelocompleto'] ?? $agregadosPropriaData['marcamodelocompleto'] ?? null,
            'marca' => $estadualData['marca'] ?? $agregadosPropriaData['marca'] ?? null,
            'modelo' => $estadualData['modelo'] ?? $agregadosPropriaData['modelo'] ?? null,
            'versao' => $estadualData['versao'] ?? $agregadosPropriaData['versao'] ?? null,
            'veianofabr' => $estadualData['veianofabr'] ?? $agregadosPropriaData['veianofabr'] ?? null,
            'veianomodelo' => $estadualData['veianomodelo'] ?? $agregadosPropriaData['veianomodelo'] ?? null,
            'tipo' => $estadualData['tipo'] ?? $agregadosPropriaData['tipo'] ?? null,
            'carroceria' => $estadualData['carroceria'] ?? $agregadosPropriaData['carroceria'] ?? null,
            'cor' => $estadualData['cor'] ?? $agregadosPropriaData['cor'] ?? null,
            'especie' => $estadualData['especie'] ?? $agregadosPropriaData['especie'] ?? null,
            'veicategoria' => $estadualData['veicategoria'] ?? $agregadosPropriaData['veicategoria'] ?? null,
            'combustivel' => $estadualData['combustivel'] ?? $agregadosPropriaData['combustivel'] ?? null,
            'potencia' => $estadualData['potencia'] ?? $agregadosPropriaData['potencia'] ?? null,
            'cilindrada' => $estadualData['cilindrada'] ?? $agregadosPropriaData['cilindrada'] ?? null,
            'capacidadecarga' => $estadualData['capacidadecarga'] ?? $agregadosPropriaData['capacidadecarga'] ?? null,
            'codigocategoria' => $estadualData['codigocategoria'] ?? $agregadosPropriaData['codigocategoria'] ?? null,
            'codigocor' => $estadualData['codigocor'] ?? $agregadosPropriaData['codigocor'] ?? null,
            'codigomarca' => $estadualData['codigomarca'] ?? $agregadosPropriaData['codigomarca'] ?? null,
            'codigotipo' => $estadualData['codigotipo'] ?? $agregadosPropriaData['codigotipo'] ?? null,
            'veiprocedencia' => $estadualData['veiprocedencia'] ?? $agregadosPropriaData['veiprocedencia'] ?? null,
            'capacidadepassag' => $estadualData['capacidadepassag'] ?? $agregadosPropriaData['capacidadepassag'] ?? null,
            'motoragregados' => $estadualData['motoragregados'] ?? $agregadosPropriaData['motoragregados'] ?? null,
            'motor' => $estadualData['motor'] ?? $agregadosPropriaData['motor'] ?? null,
            'numero_caixacambio' => $estadualData['numero_caixacambio'] ?? $agregadosPropriaData['numero_caixacambio'] ?? null,
            'numero_carroceria' => $estadualData['numero_carroceria'] ?? $agregadosPropriaData['numero_carroceria'] ?? null,
            'numero_eixotraseirodif' => $estadualData['numero_eixotraseirodif'] ?? $agregadosPropriaData['numero_eixotraseirodif'] ?? null,
            'numero_terceiroeixo' => $estadualData['numero_terceiroeixo'] ?? $agregadosPropriaData['numero_terceiroeixo'] ?? null,
            'cmt' => $estadualData['cmt'] ?? $agregadosPropriaData['cmt'] ?? null,
            'pbt' => $estadualData['pbt'] ?? $agregadosPropriaData['pbt'] ?? null,
            'eixos' => $estadualData['eixos'] ?? $agregadosPropriaData['eixos'] ?? null,
            'restricaofinan' => $estadualData['restricaofinan'] ?? $agregadosPropriaData['restricaofinan'] ?? null,
            'restricaonomeagente' => $estadualData['restricaonomeagente'] ?? $agregadosPropriaData['restricaonomeagente'] ?? null,
            'restricaoarrendatario' => $estadualData['restricaoarrendatario'] ?? $agregadosPropriaData['restricaoarrendatario'] ?? null,
            'restricaodatainclusao' => $estadualData['restricaodatainclusao'] ?? $agregadosPropriaData['restricaodatainclusao'] ?? null,
            'numerocontratofinanceira' => $estadualData['numerocontratofinanceira'] ?? $agregadosPropriaData['numerocontratofinanceira'] ?? null,
            'codigoagentefinanceiro' => $estadualData['codigoagentefinanceiro'] ?? $agregadosPropriaData['codigoagentefinanceiro'] ?? null,
            'datavigenciacontratofinanceira' => $estadualData['datavigenciacontratofinanceira'] ?? $agregadosPropriaData['datavigenciacontratofinanceira'] ?? null,
            'existedebitodeipva' => $estadualData['existedebitodeipva'] ?? $agregadosPropriaData['existedebitodeipva'] ?? null,
            'existedebitomulta' => $estadualData['existedebitomulta'] ?? $agregadosPropriaData['existedebitomulta'] ?? null,
            'debipva' => $estadualData['debipva'] ?? $agregadosPropriaData['debipva'] ?? null,
            'existedebitodelicenciamento' => $estadualData['existedebitodelicenciamento'] ?? $agregadosPropriaData['existedebitodelicenciamento'] ?? null,
            'existedebitodelicenciamentovl' => $estadualData['existedebitodelicenciamentovl'] ?? $agregadosPropriaData['existedebitodelicenciamentovl'] ?? null,
            'valortotaldebitomulta' => $estadualData['valortotaldebitomulta'] ?? $agregadosPropriaData['valortotaldebitomulta'] ?? null,
            'existedebitodedpvat' => $estadualData['existedebitodedpvat'] ?? $agregadosPropriaData['existedebitodedpvat'] ?? null,
            'dpvat' => $estadualData['dpvat'] ?? $agregadosPropriaData['dpvat'] ?? null,
            'outras_restricoes_01' => $estadualData['outras_restricoes_01'] ?? $agregadosPropriaData['outras_restricoes_01'] ?? null,
            'outras_restricoes_02' => $estadualData['outras_restricoes_02'] ?? $agregadosPropriaData['outras_restricoes_02'] ?? null,
            'outras_restricoes_03' => $estadualData['outras_restricoes_03'] ?? $agregadosPropriaData['outras_restricoes_03'] ?? null,
            'outras_restricoes_04' => $estadualData['outras_restricoes_04'] ?? $agregadosPropriaData['outras_restricoes_04'] ?? null,
            'pronomeanterior' => $estadualData['pronomeanterior'] ?? $agregadosPropriaData['pronomeanterior'] ?? null,
            'restricaocpfcnpjarrendatar' => $estadualData['restricaocpfcnpjarrendatar'] ?? $agregadosPropriaData['restricaocpfcnpjarrendatar'] ?? null,
            'intencaonomeagente' => $estadualData['intencaonomeagente'] ?? $agregadosPropriaData['intencaonomeagente'] ?? null,
            'intencaonomefinanc' => $estadualData['intencaonomefinanc'] ?? $agregadosPropriaData['intencaonomefinanc'] ?? null,
            'intencaocpfcnpjfinanc' => $estadualData['intencaocpfcnpjfinanc'] ?? $agregadosPropriaData['intencaocpfcnpjfinanc'] ?? null,
            'intencaodatainclusao' => $estadualData['intencaodatainclusao'] ?? $agregadosPropriaData['intencaodatainclusao'] ?? null,
            'debdersa' => $estadualData['debdersa'] ?? $agregadosPropriaData['debdersa'] ?? null,
            'debder' => $estadualData['debder'] ?? $agregadosPropriaData['debder'] ?? null,
            'debdetran' => $estadualData['debdetran'] ?? $agregadosPropriaData['debdetran'] ?? null,
            'debcetesb' => $estadualData['debcetesb'] ?? $agregadosPropriaData['debcetesb'] ?? null,
            'debrenainf' => $estadualData['debrenainf'] ?? $agregadosPropriaData['debrenainf'] ?? null,
            'debmunicipais' => $estadualData['debmunicipais'] ?? $agregadosPropriaData['debmunicipais'] ?? null,
            'debpolrodfed' => $estadualData['debpolrodfed'] ?? $agregadosPropriaData['debpolrodfed'] ?? null,
            'resfurto' => $estadualData['resfurto'] ?? $agregadosPropriaData['resfurto'] ?? null,
            'resguincho' => $estadualData['resguincho'] ?? $agregadosPropriaData['resguincho'] ?? null,
            'resadministrativa' => $estadualData['resadministrativa'] ?? $agregadosPropriaData['resadministrativa'] ?? null,
            'resjudicial' => $estadualData['resjudicial'] ?? $agregadosPropriaData['resjudicial'] ?? null,
            'restributaria' => $estadualData['restributaria'] ?? $agregadosPropriaData['restributaria'] ?? null,
            'resrenajud' => $estadualData['resrenajud'] ?? $agregadosPropriaData['resrenajud'] ?? null,
            'resambiental' => $estadualData['resambiental'] ?? $agregadosPropriaData['resambiental'] ?? null,
            'licexelic' => $estadualData['licexelic'] ?? $agregadosPropriaData['licexelic'] ?? null,
            'ccomunicacaovenda' => $estadualData['ccomunicacaovenda'] ?? $agregadosPropriaData['ccomunicacaovenda'] ?? null,
            'ccomunicinclusao' => $estadualData['ccomunicinclusao'] ?? $agregadosPropriaData['ccomunicinclusao'] ?? null,
            'tipodoccomprador' => $estadualData['tipodoccomprador'] ?? $agregadosPropriaData['tipodoccomprador'] ?? null,
            'cpfcnpjcomprador' => $estadualData['cpfcnpjcomprador'] ?? $agregadosPropriaData['cpfcnpjcomprador'] ?? null,
            'datavenda' => $estadualData['datavenda'] ?? $agregadosPropriaData['datavenda'] ?? null,
            'notafiscal' => $estadualData['notafiscal'] ?? $agregadosPropriaData['notafiscal'] ?? null,
            'protocolodetran' => $estadualData['protocolodetran'] ?? $agregadosPropriaData['protocolodetran'] ?? null,
            'inspecaoano' => $estadualData['inspecaoano'] ?? $agregadosPropriaData['inspecaoano'] ?? null,
            'inspecaocentro' => $estadualData['inspecaocentro'] ?? $agregadosPropriaData['inspecaocentro'] ?? null,
            'inspecaodata' => $estadualData['inspecaodata'] ?? $agregadosPropriaData['inspecaodata'] ?? null,
            'inspecaoselo' => $estadualData['inspecaoselo'] ?? $agregadosPropriaData['inspecaoselo'] ?? null,
            'inspecaostatus' => $estadualData['inspecaostatus'] ?? $agregadosPropriaData['inspecaostatus'] ?? null,
            'codigofinanceira' => $estadualData['codigofinanceira'] ?? $agregadosPropriaData['codigofinanceira'] ?? null,
            'datainclusaointencaotrocafinanceira' => $estadualData['datainclusaointencaotrocafinanceira'] ?? $agregadosPropriaData['datainclusaointencaotrocafinanceira'] ?? null,
            'datalimiterestricaotributaria' => $estadualData['datalimiterestricaotributaria'] ?? $agregadosPropriaData['datalimiterestricaotributaria'] ?? null,
        ];

        // Remove any keys with empty string values
        return array_filter($combinedData, fn($value) => $value !== "");
    }




    public function detail(string $id)
    {
        $order = Order::with('coupon')
            ->where('id', '=', $id)
            ->where('user_id', '=', auth('api')->id())
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Consulta não encontrada'], 404);
        }

        return response()->json($order, 200);
    }

    public function process(CheckoutRequest $request, PaymentService $payment_service)
    {
        $customer = null;
        $user_exists = User::where('email', '=', $request->email)->first();

        if (auth('api')->user() != null) {
            $customer = auth('api')->user();
        } elseif ($user_exists != null) {
            $customer = $user_exists;
        } else {
            $customer = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->document),
                'document' => $request->document,
                'accept_terms' => $request->accept_terms,
            ]);
        }

        $total = $this->getOption('BASE_PRICE');

        $order = Order::create([
            'total' => $total,
            'plate' => str_replace('-', '', $request->plate),
            'user_id' => $customer->id,
        ]);

        if ($request->coupon_id) {
            $coupon = Coupon::where('id', '=', $request->coupon_id)->first();

            if ($coupon) {
                if ($coupon->type == 'fixed') {
                    $total = $order->total - $coupon->amount;
                } else {
                    $discount = $coupon->amount / 100;
                    $total = $order->total * (1 - $discount);
                }

                $order->coupon_id = $request->coupon_id;
                $order->total = $total;
                $order->save();
            }
        }

        $data = [
            'total' => $total,
            'plate' => $order->plate,
            'name' => $order->user->name,
            'email' => $order->user->email,
            'document' => $request->document,
        ];

        $result = $payment_service->payment($data);

        if (!$result) {
            return response()->json(['message' => 'Erro ao gerar o pagamento'], 500);
        }

        $order->transaction_id = $result['transaction_id'];
        $order->save();

        return response()->json([
            'payment_id' => $result['transaction_id'],
            'customer' => $order->user,
            'qrcode' => $result['qrcode'],
            'code' => $result['code'],
        ], 200);
    }

    public function callback(Request $request, PaymentService $payment_service)
    {
        if ($request->type == "payment" && $request->data) {
            $payment_id = $request->data['id'];

            if ($payment_service->confirmed($payment_id)) {
                $order = Order::where('transaction_id', '=', $payment_id)->first();

                if (env('APP_ENV') == 'development') {
                    $order->status = 'confirmed';
                    $order->data = file_get_contents(base_path('resources/json/premium_response.json'));
                    $order->save();
                }

                if (env('APP_ENV') == 'production') {
                    $response = Http::withUrlParameters([
                        'endpoint' => $this->getOption('API_PLACAS_URL'),
                        'plate' => $order->plate,
                        'token' => $this->getOption('API_PLACAS_TOKEN_PREMIUM'),
                    ])->get('{+endpoint}/consulta/{plate}/{token}');

                    $order->status = 'confirmed';
                    $order->data = $response->body();
                    $order->save();
                }

                event(new PaymentEvent([
                    'payment_id' => (int)$payment_id,
                    'confirmed' => true,
                    'data' => json_decode($order->data),
                ]));
            }

            return response()->json(['message' => 'Ok'], 200);
        }
    }

    public function addToFavorites(Request $request, $orderId)
    {
        $userId = $request->input('user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID is required'], 400);
        }

        $favorite = Favorite::firstOrCreate([
            'user_id' => $userId,
            'order_id' => $orderId,
        ]);

        return response()->json($favorite, 201);
    }

    public function removeFromFavorites(Request $request, $orderId)
    {
        $userId = $request->input('user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID is required'], 400);
        }

        $favorite = Favorite::where('user_id', $userId)
            ->where('order_id', $orderId)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Removed from favorites'], 200);
        }

        return response()->json(['message' => 'Favorite not found'], 404);
    }
}
