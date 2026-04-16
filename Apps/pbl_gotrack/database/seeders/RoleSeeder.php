<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Role::create(['role_nama' => 'Superadmin', 'role_kode' => 'superAdmin']);
        Role::create(['role_nama' => 'Admin', 'role_kode' => 'admin']);
        Role::create(['role_nama' => 'Pelanggan', 'role_kode' => 'customer']);
    }
}
