<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return roles::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $roles = new roles();
        $roles->rol = $request->rol;
        $roles->fechacreacion = now()->toDateTimeString(); // Fecha y hora actual
        $roles->fechamodificacion = now()->toDateTimeString(); // Fecha y hora actual
        $roles->usuariocreacion = $request->usuariocreacion;
        $roles->usuariomodificacion = $request->usuariomodificacion;
        $roles->save();
        

        Bitacora::add("Se creo el rol con el id: ". $roles->id, $request->usuariomodificacion);
        return 'rol guardado';
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $roles = roles::find($id);
        $roles->rol = $request->rol;
        $roles->fechamodificacion = now()->toDateTimeString(); // Actualiza la fecha y hora de modificación
        $roles->usuariocreacion = $request->usuariocreacion;
        $roles->usuariomodificacion = $request->usuariomodificacion;
        $roles->save();
        Bitacora::add("Se Actualizó el rol con el id: ". $roles->id,$request->usuariomodificacion);
        return 'rol actualizado';
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id )
    {
        $roles = roles::find($id);
        $roles->delete();
        Bitacora::add("Se eliminó el rol con el id: ". $roles->id, '');
        return 'rol eliminado';
    }
}
