<?php

namespace App\Http\Controllers;

use App\Mail\GuestAuthorApproved;
use App\Mail\GuestAuthorRejected;
use App\Models\AuthorApplication;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use Str;

class AuthorApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', AuthorApplication::class); // admin only

        $applications = AuthorApplication::latest()->get();
        return Inertia::render('Author/Applications', compact('applications'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Author/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $messages = [
            'name.required' => 'Nama panggilan wajib diisi.',
            'name.string' => 'Nama panggilan  harus berupa teks.',
            'name.max' => 'Nama  tidak boleh lebih dari 255 karakter.',

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

            'profile_photo.required' => 'Foto profil wajib diunggah.',
            'profile_photo.image' => 'Foto profil harus berupa gambar.',
            'profile_photo.max' => 'Ukuran foto profil maksimal 2MB.',

            'cv.required' => 'CV wajib diunggah.',
            'cv.mimes' => 'CV harus berupa file PDF, DOC, atau DOCX.',
            'cv.max' => 'Ukuran CV maksimal 5MB.',

            'social_links.required' => 'Tautan sosial media wajib diisi.',
            'social_links.array' => 'Tautan sosial media harus berupa array.',
            'social_links.*.url' => 'Setiap tautan sosial media harus berupa URL yang valid.',

            'topic.required' => 'Bidang keahlian wajib diisi.',
            'topic.string' => 'Bidang keahlian harus berupa teks.',
            'topic.max' => 'Bidang keahlian tidak boleh lebih dari 255 karakter.',

            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
        ];

        $validated = $request->validate([

            'name' => 'required|string|max:30',
            'full_name' => 'required|string|max:30',
            'phone' => 'required|string|max:13',
            'address' => 'required|string|max:100',
            'bio' => 'required|string',
            'profile_photo' => 'required|image|max:2048',
            'cv' => 'required|mimes:pdf,doc,docx|max:5120',
            'social_links' => 'required|array',
            'social_links.*' => 'nullable|url',
            'topic' => 'required|string|max:20',
            'email' => 'required|email',
        ], $messages);

        if ($request->hasFile('profile_photo')) {
            $validated['profile_photo'] = $request->file('profile_photo')
                ->store('authors/photos', 'public');
        }

        if ($request->hasFile('cv')) {
            $validated['cv'] = $request->file('cv')
                ->store('authors/cv', 'public');
        }

        // user_id null karena guest
        $validated['user_id'] = null;

        AuthorApplication::create($validated);

        return redirect()->back()->with('success', 'Pendaftaran author berhasil dikirim!');
    }


    /**
     * Display the specified resource.
     */
    public function show(AuthorApplication $application)
    {
        $this->authorize('view', $application); // admin, author, reader sesuai policy
        return Inertia::render('Author/Show', compact('application'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AuthorApplication $application)
    {
        $this->authorize('update', $application); // author & reader only

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'bio' => 'nullable|string',
            'profile_photo' => 'nullable|image|max:2048',
            'cv' => 'nullable|mimes:pdf,doc,docx|max:5120',
            'social_links' => 'nullable|array',
            'social_links.*' => 'nullable|string',
            'topic' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('profile_photo')) {
            $validated['profile_photo'] = $request->file('profile_photo')
                ->store('authors/photos', 'public');
        }

        if ($request->hasFile('cv')) {
            $validated['cv'] = $request->file('cv')
                ->store('authors/cv', 'public');
        }

        $validated['social_links'] = $request->social_links ?? [];

        $application->update($validated);

        return redirect()->back()->with('success', 'Application updated!');
    }

    /**
     * Approve the application (admin only).
     */
    public function approve(AuthorApplication $application)
    {
        $this->authorize('approveOrReject', AuthorApplication::class);

        $application->update(['status' => 'approved']);

        $user = $application->user;

        // Kalau guest belum punya akun (user_id null)
        if (!$user) {
            $password = Str::random(10); // password sementara
            $user = \App\Models\User::create([
                'name' => $application->name,
                'full_name' => $application->full_name,
                'email' => $application->email,
                'phone' => $application->phone,
                'address' => $application->address,
                'bio' => $application->bio,
                'profile_photo_path' => $application->profile_photo,
                'cv' => $application->cv,
                'social_links' => $application->social_links ? (array)$application->social_links : [],
                'topic' => $application->topic,
                'password' => Hash::make($password),
                'role' => 'author',
                'email_verified_at' => now(), // langsung verified
            ]);

            // Update user_id di aplikasi
            $application->update(['user_id' => $user->id]);

            // Kirim email ke guest
            Mail::to($user->email)->send(new GuestAuthorApproved($user, $password));
        } else {
            // Kalau sudah ada akun, sinkronkan data dari aplikasi ke users
            $user->update([
                'name' => $application->name,
                'full_name' => $application->full_name,
                'email' => $application->email,
                'phone' => $application->phone,
                'address' => $application->address,
                'bio' => $application->bio,
                'profile_photo_path' => $application->profile_photo,
                'cv' => $application->cv,
                'social_links' => $application->social_links,
                'topic' => $application->topic,
                'role' => 'author',
            ]);
        }

        return redirect()->back()->with('success', 'Author berhasil disetujui!');
    }


    /**
     * Reject the application (admin only).
     */

    public function reject(AuthorApplication $application)
    {
        $this->authorize('approveOrReject', AuthorApplication::class);

        $application->update(['status' => 'rejected']);

        $email = $application->email;

        try {
            Mail::to($email)->send(new GuestAuthorRejected($application));
        } catch (\Exception $e) {
            \Log::error('Gagal kirim email reject: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Pendaftaran author ditolak, tapi gagal kirim email.');
        }

        return redirect()->back()->with('success', 'Pendaftaran author berhasil ditolak dan email telah dikirim!');
    }


    /**
     * List applications for the logged-in author/reader.
     */
    public function myApplications()
    {
        $applications = AuthorApplication::where('user_id', auth()->id())->get();
        return Inertia::render('Author/MyApplications', compact('applications'));
    }
}
