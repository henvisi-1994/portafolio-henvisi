<?php

namespace Src\App;

use App\Models\ConfiguracionGeneral;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Src\App\model\Reporte;
use Throwable;

class ReportePdfExcelService
{
    public function __construct()
    {
    }

    /**
     * La función `imprimir_reporte` toma varios parámetros y, según el valor de `tipo_archivo`,
     * descarga un archivo Excel o transmite un archivo PDF.
     *
     * @param tipo_archivo La variable "tipo_archivo" representa el tipo de archivo a generar, como por
     * ejemplo "excel" o "pdf".
     * @param tamanio_pagina El parámetro "tamanio_pagina" hace referencia al tamaño, ya sea A4, A5, A3, etc.
     * @param orientacion_pagina El parámetro "orientacion_pagina" hace referencia a la orientación de
     * la página en el informe PDF. Los valores posibles son: vertical (portrait) o horizontal (landscape).
     * @param reportes Es un array que contiene los datos a incluir en el informe.
     * @param nombre_reporte El nombre del archivo de informe que se generará.
     * @param vista El parámetro "vista" es el nombre del archivo de vista que se utilizará para
     * generar el informe PDF. Generalmente es un archivo de plantilla Blade (.blade.php) que contiene
     * la estructura HTML y el estilo del informe.
     * @param object export_excel El parámetro  es un objeto que representa los datos que
     * se exportarán a Excel. Se utiliza en el caso en que  (tipo de archivo) está
     * configurado en 'excel'. El método Excel::download() se llama con el objeto  y el
     *
     *
     * @return ya sea una descarga de un archivo Excel o una secuencia de un archivo PDF, dependiendo
     * del valor del parámetro ``.
     */
    public function imprimir_reporte(Reporte $reporte)
    {
        try {
            //$configuracion = ConfiguracionGeneral::first();
           // $reportes['configuracion']= $configuracion;
         //   $reportes['copyright']= 'Esta informacion es propiedad de '. $configuracion->razon_social.' - Prohibida su divulgacion';
            switch ($reporte->tipoArchivo) {
                case 'excel':
                    return Excel::download($reporte->export, $reporte->nombre . '.xlsx');
                    break;
                case 'pdf':
                    $pdf = PDF::loadView($reporte->ubicacionVista, $reporte->data);
                    $pdf->getDomPDF()->setCallbacks([
                        'totalPages' => true,
                    ]);
                    $pdf->setPaper($reporte->tamanioPagina, $reporte->orientacionPagina);
                   // $configuracion = ConfiguracionGeneral::first();

                    return $pdf->stream($reporte->nombre . '.pdf', ['pdf' => $pdf]);
                    break;
            }
        } catch (Throwable $th) {
            Log::channel('testing')->info('Log', ['Error en el listarArchivos de Archivo Service', $th->getMessage(), $th->getCode(), $th->getLine()]);
            throw new Exception($th->getMessage() . '. [LINE CODE ERROR]: ' . $th->getLine());
        }
    }
    public function enviar_pdf(Reporte $reporte){
      //  $configuracion = ConfiguracionGeneral::first();
      //  $reportes['configuracion']= $configuracion;
       /// $reportes['copyright']= 'Esta informacion es propiedad de '. $configuracion->razon_social.' - Prohibida su divulgacion';
        $pdf = Pdf::loadView($reporte->ubicacionVista, $reporte->data);
        $pdf->setPaper($reporte->tamanioPagina, $reporte->orientacionPagina);
        $pdf->setOption(['isRemoteEnabled' => true]);
        $pdf->render();
        $file = $pdf->output();
        return $file;
    }
}
