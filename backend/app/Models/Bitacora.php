<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Bitacora extends Model
{
    use HasFactory;
    protected $table = 'bitacoras';
    protected $fillable = [
        'bitacora',
        'fecha',
        'hora',
        'usuario',
    ];

    // Relación con el modelo Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuarios::class, 'idusuario');
    }

    public static function add($bitacora, $usuario)
    {
        $bitacora = Bitacora::create([
            'bitacora' => $bitacora,
            'fecha' => date('Y-m-d'),
            'hora' => date('H:i:s'),
            'usuario' => $usuario
        ]);

        return $bitacora;
    }
}
