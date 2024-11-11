<?php
namespace Src\App\model;
enum TipoVisualizacion: string {
    case VISUALIZAR = 'Visualizar';
    case REPORTE = 'Reporte';
}
class CalificacionMapeada{
public int $materia;
public TipoVisualizacion $tipo ;
public string $trimestre;
}

class DataMapeada{
    public int $materia;
    public string $trimestre;
    public array  $calificaciones;
    public array $nombresActividades;
}



