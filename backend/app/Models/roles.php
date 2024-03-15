<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class roles extends Model
{
    use HasFactory;
    protected $fillable = ['rol', 'fechacreacion', 'fechamodificacion', 'usuariocreacion', 'usuariomodificacion'];

    // Define un mutador para actualizar la fecha de modificación solo cuando se cambie el estado del rol
    public function setEstadoAttribute($value)
    {
        $this->attributes['estado'] = $value;
        $this->attributes['fechamodificacion'] = now()->toDateTimeString(); // Actualiza la fecha de modificación al momento actual
    }
}
