<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Bisnis',
                'slug' => Str::slug('Bisnis'),
                'description' => 'Kategori terkait dunia bisnis dan manajemen',
            ],
            [
                'name' => 'Teknologi',
                'slug' => Str::slug('Teknologi'),
                'description' => 'Kategori terkait perkembangan teknologi terbaru',
            ],
            [
                'name' => 'Sistem Informasi',
                'slug' => Str::slug('Sistem Informasi'),
                'description' => 'Kategori seputar sistem informasi dan penerapannya',
            ],
        ];

        DB::table('categories')->insert($categories);
    }
}
