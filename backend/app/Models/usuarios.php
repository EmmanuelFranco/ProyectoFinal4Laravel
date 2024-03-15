<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    use HasFactory;

    protected $table = 'usuarios';

    protected $fillable = [
        'idusers',
        'name',
        'usuario',
        'clave',
        'estado',
        'fecha',
        'idrol',
        'fechadecreacion',
        'fechamodificacion',
        'usuariocreacion',
        'ususariomodificacion',
    ];

    
    public function users()
    {
        return $this->belongsTo(User::class, 'idusers');
    }

    // Relación con la tabla roles
    public function rol()
    {
        return $this->belongsTo(Roles::class, 'idrol');
    }
}
