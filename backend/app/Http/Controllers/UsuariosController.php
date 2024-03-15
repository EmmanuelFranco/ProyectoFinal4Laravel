<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\Usuarios;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{

    public function index()
    {
        $usuarios = Usuarios::all();
        return response()->json($usuarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usuario = new Usuarios();
        $usuario->fill($request->all());    

        $usuario->fechadecreacion = now()->toDateTimeString();
        $usuario->fechamodificacion = now()->toDateTimeString();
        $usuario->save();
        Bitacora::add("Se creo el usuario con el id: ". $usuario->id, $usuario->usuariomodificacion);
        return response()->json(['message' => 'Usuario creado', 'usuario' => $usuario], 201);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $usuario = Usuarios::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->fill($request->all());

        $usuario->fechamodificacion = now()->toDateTimeString();
        $usuario->save();
        Bitacora::add("Se actualizó el usuario con el id: ". $usuario->id, $usuario->usuariomodificacion);
        return response()->json(['message' => 'Usuario actualizado', 'usuario' => $usuario], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $usuario = Usuarios::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $usuario->delete();
        Bitacora::add("Se eliminó el usuario con el id: ". $usuario->id, $usuario->usuariomodificacion);
        return response()->json(['message' => 'Usuario eliminado'], 200);
    }
}
