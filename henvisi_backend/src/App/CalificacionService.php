<?php

namespace Src\App;

use App\Models\Actividad;
use App\Models\Calificacion;
use App\Models\Insumo;
use App\Models\Materia;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Src\App\model\CalificacionMapeada;
use Src\App\model\DataMapeada;
use Src\App\model\DetalleCalificacion;
use Src\App\model\TipoVisualizacion;

class CalificacionService
{

    public function __construct() {}
    /**
     * Stores the califications for a specific materia and trimestre.
     *
     * @param DetalleCalificacion $detalleCalificacion The DetalleCalificacion object containing the califications data.
     *
     * @return void
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the materia with the given id is not found.
     */
    public function storeCalificacion(DetalleCalificacion $detalleCalificacion)
    {
        try {
            DB::beginTransaction();
            $materia = Materia::findOrFail($detalleCalificacion->materia_id); // Usa findOrFail para manejar mejor el caso de no encontrar la materia
            $nuevasCalificaciones = [];
            $calificacionExistente = $materia->calificaciones()
                ->where('trimestre', $detalleCalificacion->trimestre)
                ->first();
            foreach ($detalleCalificacion->calificaciones as $calificacionData) {
                $nuevasCalificaciones = array_merge(
                    $nuevasCalificaciones,
                    $this->obtenerCalificaciones($calificacionData, $detalleCalificacion->trimestre)
                );
            }
            is_null($calificacionExistente) ? $materia->calificaciones()->createMany($nuevasCalificaciones) : $this->actualizarCalificacion($nuevasCalificaciones, $materia);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al actualizar' => [$e->getMessage()],
            ]);
        }
    }
    /**
     * Updates the existing califications for a specific materia and trimestre.
     *
     * @param array $calificaciones An array of califications to be updated. Each calification is represented as an associative array with keys: 'estudiante_id', 'actividad_id', 'trimestre', and 'nota'.
     * @param Materia $materia The Materia object for which the califications are being updated.
     *
     * @return void
     *
     * @throws \Exception If any error occurs during the update process.
     */
    private function actualizarCalificacion($calificaciones, Materia $materia)
    {
        try {
            DB::beginTransaction();
            foreach ($calificaciones as $calificacion) {
                $data = [
                    'nota' => $calificacion['nota'],
                ];
                // Buscar si ya existe la calificación
                $exists = $materia->calificaciones()
                    ->where('estudiante_id', $calificacion['estudiante_id'])
                    ->where('actividad_id', $calificacion['actividad_id'])
                    ->where('trimestre', $calificacion['trimestre'])
                    ->exists();

                if ($exists) {
                    // Actualizar si ya existe
                    $materia->calificaciones()
                        ->where('estudiante_id', $calificacion['estudiante_id'])
                        ->where('actividad_id', $calificacion['actividad_id'])
                        ->where('trimestre', $calificacion['trimestre'])
                        ->update($data);
                }
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al actualizar' => [$e->getMessage()],
            ]);
        }
    }

    /**
     * Processes and maps the califications for a specific student and trimester.
     *
     * @param array $calificacion An associative array containing student's califications.
     * @param string $trimestre The trimester for which the califications are being processed.
     *
     * @return array An array of califications, where each calification is represented as an associative array with keys:
     *               'estudiante_id', 'actividad_id', 'nota', 'logro_id', and 'trimestre'.
     *               The function only includes califications with numeric keys, representing actividad_id.
     *
     * @throws \Exception If any error occurs during the processing of califications.
     */
    private function obtenerCalificaciones($calificacion, string $trimestre)
    {
        $result = [];

        foreach ($calificacion as $key => $value) {
            if (is_numeric($key)) {
                $result[] = [
                    'estudiante_id' => $calificacion['id'],
                    'actividad_id' => $key,
                    'nota' => $value,
                    'trimestre' => $trimestre,
                ];
            }
        }
        return $result;
    }
    /**
     * Processes and maps the califications for each materia and trimestre.
     *
     * @param Collection $materias A collection of Materia objects.
     * @param string $tipo The type of calification to be processed.
     * @param Request $request The HTTP request object containing the trimestre parameter.
     *
     * @return Collection A collection of mapped califications, grouped by materia and trimestre.
     *
     * @throws \Exception If any error occurs during the processing or mapping of califications.
     */
    public function obtenerCalificacionesMapeada(CalificacionMapeada $calificacionMap)
    {
        $materias = Materia::where('id', $calificacionMap->materia)
            ->with(['calificaciones.estudiante' => function ($query) {
                $query->select('id', 'nombres'); // Seleccionar solo los campos necesarios del estudiante
            }, 'calificaciones.actividad' => function ($query) {
                $query->select('id', 'nombre', 'insumo_id','tipo_actividad_id'); // Seleccionar solo los campos necesarios de la actividad
            }])
            ->get();
        $trimestre = $calificacionMap->trimestre;
        return $materias->map(function ($materia) use ($trimestre, $calificacionMap) {
            // Filtrar calificaciones del trimestre solo una vez
            $calificacionesTrimestre = $materia->calificaciones->where('trimestre', $trimestre);
            $calificacionesPorEstudiante = $calificacionesTrimestre->groupBy('estudiante_id')->map(function ($calificaciones, $estudianteId) {
                // Obtener el primer registro de estudiante
                $estudiante = $calificaciones->first()->estudiante;
                $logroId = $calificaciones->first()->logro_id;
                // Filtrar formativas y sumativas solo una vez

                $individuales = $calificaciones->filter(fn($calificacion) => $calificacion->actividad->tipo_actividad_id == Actividad::INDIVIDUAL);
                $grupales = $calificaciones->filter(fn($calificacion) => $calificacion->actividad->tipo_actividad_id == Actividad::GRUPAL);
                $refuerzoPedagogico = $calificaciones->filter(fn($calificacion) => $calificacion->actividad->tipo_actividad_id == Actividad::REFUERZO_ACADEMICO);
                $proyecto = $calificaciones->filter(function ($calificacion) {
                    return strpos(strtolower($calificacion->actividad->nombre), 'proyecto') !== false;
                })->pluck('nota')->first();
                $examen = $calificaciones->filter(function ($calificacion) {
                    return strpos(strtolower($calificacion->actividad->nombre), 'examen') !== false;
                })->pluck('nota')->first();
                $formativas = $calificaciones->filter(fn($calificacion) => $calificacion->actividad->insumo_id == Insumo::FORMATIVO);
                $sumativas = $calificaciones->filter(fn($calificacion) => $calificacion->actividad->insumo_id == Insumo::SUMATIVO);
                // Calcular promedios
                $promedioFormativo = $formativas->avg('nota') ?? 0;
                $promedioSumativo = $sumativas->avg('nota') ?? 0;
                $promedioActividadesIndividuales = $individuales->avg('nota') ?? 0;
                $promedioActividadesGrupales = $grupales->avg('nota') ?? 0;
                $promedioRefuerzoAcademico = $refuerzoPedagogico->avg('nota') ?? 0;

                // Calcular ponderaciones
                $promedioParcial70 = round($promedioFormativo * 0.7, 2);
                $promedioParcial30 = round($promedioSumativo * 0.3, 2);
                $promedioFinal = round($promedioParcial70 + $promedioParcial30, 2);
                return [
                    'id' => $estudiante->id,
                    'estudiante' => $estudiante->nombres,
                    'calificaciones' => $calificaciones->pluck('nota', 'actividad_id')->toArray(),
                    'logro' => '', // Asumiendo que se rellenará posteriormente
                    'promedioFormativo' => number_format($promedioFormativo, 2),
                    'promedioSumativo' => number_format($promedioSumativo, 2),
                    'actividadesIndividuales' => number_format($promedioActividadesIndividuales,2),
                    'actividadesGrupales' => number_format($promedioActividadesGrupales,2),
                    'refuerzoPedagogico'  =>number_format($promedioRefuerzoAcademico,2),
                    'proyectoInterdiciplinarrio' =>number_format($proyecto,2),
                    'evaluacionBaseEstructural' =>number_format($examen,2),
                    'promedioParcial70' => number_format($promedioParcial70, 2),
                    'promedioParcial30' => number_format($promedioParcial30, 2),
                    'promedioFinal' => number_format($promedioFinal, 2),
                    'comportamiento' => $logroId
                ];
            });

            // Preparar la estructura de datos
            $data = new DataMapeada();
            $data->materia = $materia->id;
            $data->trimestre = $trimestre;
            $data->calificaciones = $calificacionesPorEstudiante->values()->toArray();
            // Extraer los nombres de las actividades de las calificaciones
            if ($calificacionMap->tipo == TipoVisualizacion::REPORTE) {
                $data->nombresActividades = $calificacionesTrimestre->pluck('actividad.nombre')->unique()->values()->toArray();
            }
            return $data;
        });
    }
    /**
     * Retrieves the average grades for each student in a specific subject for each trimester.
     *
     * @param CalificacionMapeada $calificacionMap The object containing the subject and trimester parameters.
     *
     * @return array A multi-dimensional array containing the average grades for each student in each trimester.
     *               The array structure is as follows:
     *               [
     *                   [
     *                       'estudiante' => 'Student Name',
     *                       'promediosPorTrimestre' => [
     *                           'trimestre' => 'Average Grade',
     *                           ...
     *                       ]
     *                   ],
     *                   ...
     *               ]
     *               If there are no grades for a student in a specific trimester, the value will be 'Sin datos'.
     */
    public function obtenerCalificacionesTrimestre(CalificacionMapeada $calificacionMap)
    {
        $materias = Materia::where('id', $calificacionMap->materia)
            ->with(['calificaciones.estudiante' => function ($query) {
                $query->select('id', 'nombres'); // Select only necessary fields from the student
            }, 'calificaciones.actividad' => function ($query) {
                $query->select('id', 'nombre', 'insumo_id'); // Select only necessary fields from the activity
            }])
            ->get();

        return $materias->map(function ($materia) {
            // Group the grades by student and trimester
            return $materia->calificaciones->groupBy('estudiante_id')->map(function ($calificaciones, $estudianteId) {
                $promediosPorTrimestre = collect([Calificacion::PRIMER_TRIMESTRE, Calificacion::SEGUNDO_TRIMESTRE, Calificacion::TERCER_TRIMESTRE])->mapWithKeys(function ($trimestre) use ($calificaciones) {
                    // Filter grades for the current trimester
                    $calificacionesTrimestre = $calificaciones->where('trimestre', $trimestre);

                    if ($calificacionesTrimestre->isEmpty()) {
                        return [$trimestre => '0.00'];
                    }

                    // Filter formative and summative grades
                    $formativas = $calificacionesTrimestre->filter(fn($calificacion) => $calificacion->actividad->insumo_id == Insumo::FORMATIVO);
                    $sumativas = $calificacionesTrimestre->filter(fn($calificacion) => $calificacion->actividad->insumo_id == Insumo::SUMATIVO);

                    // Calculate averages
                    $promedioFormativo = $formativas->avg('nota') ?? 0;
                    $promedioSumativo = $sumativas->avg('nota') ?? 0;

                    // Calculate weighted averages
                    $promedioParcial70 = round($promedioFormativo * 0.7, 2);
                    $promedioParcial30 = round($promedioSumativo * 0.3, 2);
                    $promedioFinal = round($promedioParcial70 + $promedioParcial30, 2);

                    // Return the final average grade for the current trimester
                    return [$trimestre => number_format($promedioFinal, 2)];
                });

                // Return the result for the student with the average grades for each trimester
                return [
                    'estudiante' => $calificaciones->first()->estudiante->nombres,
                    'promediosPorTrimestre' => $promediosPorTrimestre->toArray()
                ];
            })->values()->toArray(); // Get the values as a simple array
        });
    }
}
