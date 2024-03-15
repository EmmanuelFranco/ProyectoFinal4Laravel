<?php

namespace App\Http\Controllers;

use App\Models\roles;
use Illuminate\Http\Request;

class RolController extends Controller
{
    public function update(Request $request, $id)
    {
        $role = roles::find($id);

        if (!$role) {
            return response()->json(['message' => 'Rol no encontrado'], 404);
        }

        $role->estado = $request->input('estado');
        $role->save();

        return response()->json($role);
    }
}
