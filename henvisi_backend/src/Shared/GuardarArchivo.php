<?php

namespace Src\Shared;

use App\Models\Carpeta;
use App\Models\Empleado;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Src\Config\RutasStorage;

use function React\Promise\Stream\first;

class GuardarArchivo
{
    private Model $modelo;
    private Request $request;
    private RutasStorage $ruta;

    public function __construct(Model $modelo, Request $request, RutasStorage $ruta)
    {
        $this->modelo = $modelo;
        $this->request = $request;
        $this->ruta = $ruta;
    }

    public function execute()
    {
        $archivo = $this->request->file('file');
        // $carpeta = $this->request['carpeta'];
        // $carpeta = Carpeta::find($carpeta);

        $path = $archivo->store($this->ruta->value);
        $ruta_relativa = Utils::obtenerRutaRelativaArchivo($path);
        return $this->modelo->archivos()->create([
            'nombre' => $archivo->getClientOriginalName(),
            'ruta' => $ruta_relativa,
            'tamanio_bytes' => filesize($archivo)
        ]);
    }

}
