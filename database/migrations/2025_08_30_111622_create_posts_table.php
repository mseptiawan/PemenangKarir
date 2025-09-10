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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('slug', 255)->unique();
            $table->string('title', 200);
            $table->text('excerpt')->nullable();
            $table->longText('content'); // aman untuk HTML panjang
            $table->string('thumbnail')->nullable();
            $table->enum('status', ['draft', 'pending', 'published', 'rejected'])->default('draft'); // tambahkan pending & rejected
            $table->text('rejection_reason')->nullable(); // untuk alasan reject
            $table->dateTime('published_at')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->timestamps(); // created_at & updated_at
            $table->softDeletes(); // deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
