<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus user lama biar ga dobel
        DB::table('users')->whereIn('email', [
            'admin@gmail.com',
            'author1@gmail.com',
            'author2@gmail.com',
            'author3@gmail.com',
            'reader1@gmail.com',
            'reader2@gmail.com',
            'reader3@gmail.com',
        ])->delete();

        // Admin
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('katasandi'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3 Author
        DB::table('users')->insert([
            [
                'name' => 'Author One',
                'email' => 'author1@gmail.com',
                'password' => Hash::make('katasandi'),
                'role' => 'author',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Author Two',
                'email' => 'author2@gmail.com',
                'password' => Hash::make('katasandi'),
                'role' => 'author',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Author Three',
                'email' => 'author3@gmail.com',
                'password' => Hash::make('katasandi'),
                'role' => 'author',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
