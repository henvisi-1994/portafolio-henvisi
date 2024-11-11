<?php

namespace Src\App;

use App\Models\BuyCart\CalculadoraImportacion;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BuyCartService
{
    public function __construct()
    {
    }
    public static function detalle_producto(string $product_id): Response
    {
        $url = "https://api.zinc.io/v1/products/{$product_id}?retailer=amazon";
        $headers = [
            'Authorization' => 'Basic ' . base64_encode("CEDEB388A2226C78379FB401:"),
        ];
        $response = Http::withHeaders($headers)->get($url);
        return $response;
    }
    public static function calcularImportacion($costo_envio){
        $costo_enbalaje= 0;
        $costo_envio_almacen= 0;
        $costo_envio_cliente= CalculadoraImportacion::find(1)?->valor;
        $costo_importacion_total = $costo_envio+$costo_enbalaje+$costo_envio_almacen+$costo_envio_cliente;
        $gastos_operativos = 30;
        $igv = $gastos_operativos*0.18;
        $subtotal= $costo_importacion_total+ $gastos_operativos+$igv;
        $porcentaje_nuviz = $subtotal*0.0345;
        $igv_nuviz= $porcentaje_nuviz*0.18;
        $subtotal_nuviz = $porcentaje_nuviz+$igv_nuviz+1;
        $total= $subtotal+$subtotal_nuviz;
        $total = ceil($total);
        return compact('subtotal','total');
    }
}
