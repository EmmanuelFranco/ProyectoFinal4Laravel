<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paginas extends Model
{
    protected $table = 'paginas';

    protected $fillable = [
        'fechadecreacion',
        'fechamodificacion',
        'usuariocreacion',
        'url',
        'estado',
        'nombre',
        'descripcion',
        'icono',
        'tipo',
    ];

    // Si no deseas que Eloquent administre automáticamente las marcas de tiempo created_at y updated_at, puedes establecer esta propiedad en false
    public $timestamps = false;
}
