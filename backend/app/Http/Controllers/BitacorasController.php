<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use Illuminate\Http\Request;

class BitacorasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bitacoras = Bitacora::all();
        return response()->json($bitacoras);
    }

    public static function add($bitacora)
    {       
        $bitacora = Bitacora::create([
            'bitacora' => $bitacora,            
            'fecha' => date('Y-m-d'),
            'hora' => date('H:i:s'),                
            'usuario' => auth()->user()->name
        ]);
    
        return $bitacora;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)    {
        
        Bitacora::create($request->all());

        return response()->json(['response'=> true,'message' => 'Bitacora Creada']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bitacora $bitacora)
    {
        return response()->json($bitacora);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bitacora $bitacora)
    {
        $request->validate([
            'bitacora' => 'required',
            'idusuario' => 'required',
            'fecha' => 'required',
            'hora' => 'required',
            'ip' => 'required',
            'so' => 'required',
            'navegador' => 'required',
            'usuario' => 'required',
        ]);

        $bitacora->update($request->all());

        return response()->json(['message' => 'Bitacora updated', 'bitacora' => $bitacora], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bitacora $bitacora)
    {
        $bitacora->delete();

        return response()->json(['message' => 'Bitacora deleted']);
    }
}
