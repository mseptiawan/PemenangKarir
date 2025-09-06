<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    /**
     * Semua user bisa lihat daftar dan detail post.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }


    public function view(?User $user, Post $post): bool
    {
        return true; // semua orang, termasuk guest boleh lihat
    }

    /**
     * Hanya author & admin boleh bikin post.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['author', 'admin']);
    }

    /**
     * Author atau admin boleh update post miliknya sendiri,
     */
    public function update(User $user, Post $post): bool
    {
        if ($user->role === 'admin') {
            return true; // admin bisa update semua
        }

        if ($user->role === 'author' && $user->id === $post->user_id) {
            return true; // author hanya bisa update miliknya sendiri
        }

        return false; // reader atau role lain ga bisa
    }


    public function delete(User $user, Post $post): bool
    {
        if ($user->role === 'admin') {
            return true; // admin bebas hapus semua post
        }

        if ($user->role === 'author' && $user->id === $post->user_id) {
            return true; // author cuma boleh hapus post miliknya
        }

        return false; // reader dan role lain tidak boleh
    }

    /**
     * Optional: restore & forceDelete (kalau pakai soft delete).
     */
    public function restore(User $user, Post $post): bool
    {
        return $user->role === 'admin';
    }

    public function forceDelete(User $user, Post $post): bool
    {
        return $user->role === 'admin';
    }
}
