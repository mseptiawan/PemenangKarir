<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Post;
use Carbon\Carbon;

class PurgeOldPosts extends Command
{
    protected $signature = 'posts:purge-old';
    protected $description = 'Hapus permanen post yang sudah lebih dari 30 hari dihapus';

    public function handle()
    {
        $date = Carbon::now()->subDays(30);

        $count = Post::onlyTrashed()
            ->where('deleted_at', '<', $date)
            ->forceDelete();

        $this->info("{$count} post berhasil dihapus permanen.");
    }
}
