<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat admin baru
        User::create([
            'name' => 'M. Septiawan',
            'email' => 'mseptiawan017@gmail.com',
            'password' => Hash::make('katasandi'), // pastikan ganti password default di produksi
            'role' => 'admin',
        ]);
    }
}
