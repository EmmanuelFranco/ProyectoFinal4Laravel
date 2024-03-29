<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\paginas;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $roles=new RolesSeeder;
       $roles->run();
       $users=new UsersSeeder;
       $users->run();
       $paginas= new PaginasSeeder;
       $paginas->run();        
       $enlaces=new EnlacesSeeder;
       $enlaces->run();
       $usuarios=new UsuariosSeeder;
       $usuarios->run();       
        $bitacora=new BitacorasSeeder;
       $bitacora->run();
    }
}
