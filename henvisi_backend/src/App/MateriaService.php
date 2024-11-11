<?php

namespace Src\App;

use App\Models\Actividad;
use App\Models\DetalleUnidad;
use App\Models\Estudiante;
use App\Models\Materia;
use App\Models\MateriaHasEstudiante;
use App\Models\Unidad;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class MateriaService
{

    public function __construct() {}
    public function storeUnidades($unidades, Materia $materia)
    {
        try {
            DB::beginTransaction();
            $is_nuevo = true;
            $unidades_collection = collect($unidades);
            $recibidosIds = $unidades_collection->pluck('id')->filter()->all();

            foreach ($unidades as $unidadData) {
                $unidadData['parcial_id'] = $unidadData['parcial'];
                $unidadData['bloque_id'] = $unidadData['bloque'];
                unset($unidadData['parcial'], $unidadData['bloque']);

                // Encuentra la unidad existente o crea una nueva si no existe
                $unidad = Unidad::find($unidadData['id']); // Asumiendo que tienes un 'id' en $unidadData
                if ($unidad) {
                    // Si la unidad existe, la actualiza
                    $unidad->update($unidadData);
                } else {
                    // Si la unidad no existe, la crea
                    $unidad = Unidad::create($unidadData);
                }

                // Actualiza o crea el detalle de unidades
                $detalleUnidad = $materia->detalleUnidades()->where('unidad_id', $unidad->id)->first();
                if ($detalleUnidad) {
                    $is_nuevo = false;
                    $detalleUnidad->update(['materia_id' => $materia->id]);
                } else {
                    $materia->detalleUnidades()->create([
                        'materia_id' => $materia->id,
                        'unidad_id' => $unidad->id
                    ]);
                }
            }

            if (!$is_nuevo) {
                // Obtener los IDs de unidades que van a ser eliminados
                $unidadesAEliminar = $materia->detalleUnidades()
                    ->whereNotIn('unidad_id', $recibidosIds)
                    ->pluck('unidad_id');

                // Eliminar los detalles de unidad que no están en los IDs recibidos
                $materia->detalleUnidades()->whereNotIn('unidad_id', $recibidosIds)->delete();
                DB::commit();

                // Eliminar las unidades correspondientes
                $this->eliminarUnidades($unidadesAEliminar);
            } else {
                DB::commit();
            }
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al actualizar' => [$e->getMessage()],
            ]);
        }
    }
    public function eliminarUnidades($ids)
    {
        try {
            DB::beginTransaction();
            // Primero elimina los registros relacionados en detalle_unidades
            DB::table('detalle_unidades')->whereIn('unidad_id', $ids)->delete();
            // Ahora puedes eliminar las unidades
            Unidad::whereIn('id', $ids)->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al eliminar' => [$e->getMessage()],
            ]);
        }
    }
    public function storeActividades($actividades, Materia $materia)
    {
        try {
            DB::beginTransaction();
            $is_nuevo = true;
            $actividadesCollection = collect($actividades);
            $recibidosIds = $actividadesCollection->pluck('id')->filter()->all();
            foreach ($actividades as $actividadData) {
                $actividadData['insumo_id'] = $actividadData['insumo'];
                $actividadData['tipo_actividad_id'] = $actividadData['tipo_actividad'];
                unset($actividadData['insumo'], $actividadData['tipo_actividad']);

                // Encuentra la actividad existente o crea una nueva si no existe
                $actividad = Actividad::find($actividadData['id']); // Asumiendo que tienes un 'id' en $actividadData
                if ($actividad) {
                    // Si la actividad existe, la actualiza
                    $actividad->update($actividadData);
                } else {
                    // Si la actividad no existe, la crea
                    $actividad = Actividad::create($actividadData);
                }

                // Actualiza o crea la relación entre la materia y la actividad
                $materiaHasActividad = $materia->materiaHasActividad()->where('actividad_id', $actividad->id)->first();
                if ($materiaHasActividad) {
                    $is_nuevo = false;
                    $materiaHasActividad->update(['materia_id' => $materia->id]);
                } else {
                    $materia->materiaHasActividad()->create([
                        'materia_id' => $materia->id,
                        'actividad_id' => $actividad->id
                    ]);
                }
            }
            if (!$is_nuevo) {
                // Obtener los IDs de unidades que van a ser eliminados
                $actividadesAEliminar = $materia->materiaHasActividad()
                    ->whereNotIn('actividad_id', $recibidosIds)
                    ->pluck('actividad_id');

                // Eliminar los detalles de unidad que no están en los IDs recibidos
                $materia->materiaHasActividad()->whereNotIn('actividad_id', $recibidosIds)->delete();
                DB::commit();

                // Eliminar las unidades correspondientes
                $this->eliminarActividades($actividadesAEliminar);
            } else {
                DB::commit();
            }
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al actualizar' => [$e->getMessage()],
            ]);
        }
    }
    public function eliminarActividades($ids)
    {
        try {
            DB::beginTransaction();
            // Primero elimina los registros relacionados en detalle_unidades
            DB::table('est_materia_has_actividades')->whereIn('actividad_id', $ids)->delete();
            // Ahora puedes eliminar las unidades
            Actividad::whereIn('id', $ids)->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al eliminar' => [$e->getMessage()],
            ]);
        }
    }
    public function storeEstudiantes($estudiantes, Materia $materia)
    {
        try {
            $backtrace = debug_backtrace();
            DB::beginTransaction();
            $is_nuevo = true;
            $estudiantesCollection = collect($estudiantes);
            $recibidosIds = $estudiantesCollection->pluck('id')->filter()->all();

            foreach ($estudiantes as $estudianteData) {
                $estudianteData['institucion_id'] = $materia->institucion_id;
                $estudianteData['curso_id'] = $materia->curso_id;
                $estudianteData['paralelo_id'] = $materia->paralelo_id;
                // Encuentra el estudiante existente o crea una nueva si no existe
                $estudiante = Estudiante::where('id',$estudianteData['id'])->orWhere('dni',$estudianteData['dni'])->first(); // Asumiendo que tienes un 'id' en $estudianteData
                if ($estudiante) {
                    $cantidadEstudiantes= MateriaHasEstudiante::where('estudiante_id',$estudiante->id)->get()->count();
                    // Si el estudiante existe, la actualiza
                    $backtrace[1]['function'] =='update' && $cantidadEstudiantes > 1?? $estudiante->update($estudianteData);
                } else {
                    // Si estudiante no existe, la crea
                    $estudiante = Estudiante::create($estudianteData);
                }

                // Actualiza o crea la relación entre la materia y el estudiante
                $materiaHasEstudiante = $materia->materiaHasEstudiante()->where('estudiante_id', $estudiante->id)->first();
                if ($materiaHasEstudiante) {
                    $is_nuevo = false;
                    $materiaHasEstudiante->update(['materia_id' => $materia->id]);
                } else {
                    $materia->materiaHasEstudiante()->create([
                        'materia_id' => $materia->id,
                        'estudiante_id' => $estudiante->id
                    ]);
                }
            }
            if (!$is_nuevo) {
                // Obtener los IDs de unidades que van a ser eliminados
                $estudiantesAEliminar = $materia->materiaHasEstudiante()
                    ->whereNotIn('estudiante_id', $recibidosIds)
                    ->pluck('estudiante_id');

                // Eliminar los detalles de unidad que no están en los IDs recibidos
                $materia->materiaHasEstudiante()->whereNotIn('estudiante_id', $recibidosIds)->delete();
                DB::commit();

                // Eliminar los estudiantes correspondientes
                $this->eliminarEstudiantes($estudiantesAEliminar);
            } else {
                DB::commit();
            }
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al eliminar' => [$e->getMessage()],
            ]);
        }
    }
    public function eliminarEstudiantes($ids)
    {
        try {
            DB::beginTransaction();
            // Primero elimina los registros relacionados en detalle_unidades
            DB::table('est_materia_has_estudiantes')->whereIn('estudiante_id', $ids)->delete();
            // Ahora puedes eliminar las unidades
            $cantidad_detalle = DB::table('est_materia_has_estudiantes')->whereIn('estudiante_id', $ids)->get()->count();
            if ($cantidad_detalle) {
                Estudiante::whereIn('id', $ids)->delete();
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al eliminar' => [$e->getMessage()],
            ]);
        }
    }
}
