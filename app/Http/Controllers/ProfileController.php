<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\AuthorApplication;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index()
    {
        $user = auth()->user();

        $application = AuthorApplication::where('user_id', $user->id)
            ->where('status', 'approved')
            ->latest()
            ->first();

        return Inertia::render('Profile/ProfileCard', [
            'application' => $application,
        ]);
    }
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/ProfileCard', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }


    /**
     * Update the user's profile information.
     */

    public function update(Request $request)
    {
        $user = $request->user();
 $messages = [
        'name.required' => 'Nama panggilan wajib diisi.',
        'name.string' => 'Nama panggilan harus berupa teks.',
        'name.max' => 'Nama panggilan tidak boleh lebih dari 255 karakter.',

        'full_name.required' => 'Nama lengkap wajib diisi.',
        'full_name.string' => 'Nama lengkap harus berupa teks.',
        'full_name.max' => 'Nama lengkap tidak boleh lebih dari 255 karakter.',

        'phone.required' => 'Nomor telepon wajib diisi.',
        'phone.string' => 'Nomor telepon harus berupa teks.',
        'phone.max' => 'Nomor telepon tidak boleh lebih dari 20 karakter.',

        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa teks.',
        'address.max' => 'Alamat tidak boleh lebih dari 500 karakter.',

        'bio.required' => 'Bio wajib diisi.',
        'bio.string' => 'Bio harus berupa teks.',

        'topic.required' => 'Bidang keahlian wajib diisi.',
        'topic.string' => 'Bidang keahlian harus berupa teks.',
        'topic.max' => 'Bidang keahlian tidak boleh lebih dari 255 karakter.',

        'profile_photo.image' => 'Foto profil harus berupa gambar.',
        'profile_photo.max' => 'Ukuran foto profil maksimal 2MB.',

        'cv.mimes' => 'CV harus berupa file PDF, DOC, atau DOCX.',
        'cv.max' => 'Ukuran CV maksimal 5MB.',

        'social_links.array' => 'Tautan sosial media harus berupa array.',
        'social_links.*.string' => 'Setiap tautan sosial media harus berupa teks.',
    ];

        // Validasi input
        $validated = $request->validate([
        'name' => 'required|string|max:255',
        'full_name' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'address' => 'required|string|max:500',
        'bio' => 'required|string',
        'topic' => 'required|string|max:255',
        'profile_photo' => 'nullable|image|max:2048',
        'cv' => 'nullable|mimes:pdf,doc,docx|max:5120',
        'social_links' => 'nullable|array',
        'social_links.*' => 'nullable|string',
    ], $messages);

        $updateData = [
            'name' => $validated['name'] ?? $user->name,
            'full_name' => $validated['full_name'],
            'phone' => $validated['phone'] ?? $user->phone,
            'address' => $validated['address'] ?? $user->address,
            'bio' => $validated['bio'] ?? $user->bio,
            'topic' => $validated['topic'] ?? $user->topic,
            'social_links' => $validated['social_links'] ?? $user->social_links ?? [],
        ];

        // Handle profile photo
        if ($request->hasFile('profile_photo')) {
            // Hapus file lama kalau ada
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }
            $updateData['profile_photo_path'] = $request->file('profile_photo')
                ->store('authors/photos', 'public');
        }

        // Handle CV
        if ($request->hasFile('cv')) {
            if ($user->cv) {
                Storage::disk('public')->delete($user->cv);
            }
            $updateData['cv'] = $request->file('cv')->store('authors/cv', 'public');
        }

        // Update user
        $user->update($updateData);

        return back()->with('success', 'Profile berhasil diperbarui!');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/login');
    }
    // app/Http/Controllers/ProfileController.php
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        $path = $request->file('avatar')->store('avatars', 'public');

        // simpan di aplikasi author, bukan di users
        $application = $request->user()->authorApplication;
        if ($application) {
            $application->update(['profile_photo' => $path]);
        }

        return back()->with('success', 'Avatar berhasil diperbarui!');
    }
    public function editPassword(Request $request): Response
    {
        return Inertia::render('Profile/UpdatePasswordForm', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
