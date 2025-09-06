<?php

namespace App\Policies;

use App\Models\AuthorApplication;
use App\Models\User;

class AuthorApplicationPolicy
{
    /**
     * Determine whether the user can view any applications.
     */
    public function viewAny(User $user): bool
    {
        // Hanya admin yang bisa lihat daftar semua aplikasi
        return $user->role === 'admin';
    }

    public function view(User $user, AuthorApplication $application): bool
    {
        if ($user->role === 'admin') {
            return true; // admin bisa lihat semua aplikasi
        }

        // Author atau reader cuma bisa lihat aplikasinya sendiri
        return $user->id === $application->user_id;
    }

    /**
     * Determine whether the user can create applications.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update an application.
     */
    public function update(User $user, AuthorApplication $application): bool
    {
        // Hanya author atau reader yang bisa update aplikasinya sendiri
        return in_array($user->role, ['author', 'reader']) && $user->id === $application->user_id;
    }

    /**
     * Determine whether the user can delete an application.
     */
    public function delete(User $user, AuthorApplication $application): bool
    {
        if ($user->role === 'admin') {
            return true; // admin bisa hapus semua
        }

        // reader ga boleh hapus
        return false;
    }

    /**
     * Determine whether the user can approve/reject an application.
     */
    public function approveOrReject(User $user): bool
    {
        // Hanya admin yang bisa approve/reject
        return $user->role === 'admin';
    }
}
