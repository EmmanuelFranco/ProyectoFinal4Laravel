<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idusers');
            $table->foreign('idusers')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name');
            $table->string('usuario');
            $table->string('clave');
            $table->boolean('estado')->default(true);
            $table->string('fecha');
            $table->unsignedBigInteger('idrol');
            $table->foreign('idrol')->references('id')->on('roles')->onDelete('cascade')->onUpdate('cascade');
            $table->string('fechadecreacion');
            $table->string('fechamodificacion');
            $table->string('usuariocreacion');
            $table->string('ususariomodificacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
