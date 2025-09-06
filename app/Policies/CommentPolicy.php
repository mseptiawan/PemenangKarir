<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class CommentPolicy
{
    public function viewAny(?User $user): bool
    {
        return true; // semua orang bisa lihat komentar
    }

    public function view(?User $user, Comment $comment): bool
    {
        return true; // semua orang bisa lihat komentar
    }

    public function create(?User $user): bool
    {
        // Guest (null) juga boleh create
        return true;
    }

    public function update(?User $user, Comment $comment): bool
    {
        // Admin selalu boleh
        if ($user?->role === 'admin') {
            return true;
        }

        // Kalau login: hanya boleh update miliknya sendiri
        if ($user && in_array($user->role, ['author', 'reader'])) {
            return $comment->user_id === $user->id;
        }

        // Guest **tidak bisa edit**
        return false;
    }

    public function delete(?User $user, Comment $comment): bool
    {
        // Admin selalu boleh
        if ($user?->role === 'admin') {
            return true;
        }

        // Kalau login: hanya boleh hapus miliknya sendiri
        if ($user && in_array($user->role, ['author', 'reader'])) {
            return $comment->user_id === $user->id;
        }

        // Guest **tidak bisa hapus**
        return false;
    }
}
