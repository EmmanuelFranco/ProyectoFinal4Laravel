<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function update(Request $request, $id)
    {
        // Buscar el usuario por su ID
        $usuario = Usuarios::find($id);

        // Verificar si el usuario existe
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Actualizar el estado del usuario
        $usuario->estado = $request->input('estado');
        $usuario->save();

        // Retornar el usuario actualizado como JSON
        return response()->json($usuario);
    }
}
