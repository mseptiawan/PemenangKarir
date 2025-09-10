<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\PostImage;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with(['author', 'categories'])
            ->where('status', 'published') // filter published
            ->orderBy('created_at', 'desc');

        // Jika ada query search
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhereHas('author', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Pagination, misal 9 per halaman
        $posts = $query->paginate(9)->withQueryString();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'search' => $search,
        ]);
    }

    public function indexForGuest(Request $request)
    {
        $query = Post::with(['author', 'categories'])
            ->where('status', 'published')
            ->orderBy('created_at', 'desc');

        // Filter search
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhereHas('author', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Filter kategori
        if ($category = $request->input('category')) {
            $query->whereHas('categories', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }

        // Batasi 6 post per halaman
        $posts = $query->paginate(6)->withQueryString(); // paginate(6) + pertahankan query string
        $isHomepage = !$request->has('category') && !$request->has('search');
        return Inertia::render('Posts/IndexForGuest', [
            'posts' => $posts,
            'search' => $search,
            'categories' => Category::all(),
            'selectedCategory' => $category,
            'isHomepage' => $isHomepage,
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Post::class); // cek izin via PostPolicy

        $categories = Category::all();

        return Inertia::render('Posts/Create', [
            'categories' => $categories,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $this->authorize('create', Post::class);

        $messages = [
            'title.required' => 'Judul wajib diisi.',
            'title.string' => 'Judul harus berupa teks.',
            'title.max' => 'Judul maksimal 200 karakter.',

            'slug.required' => 'Isi slug',
            'slug.string' => 'Judul harus berupa teks.',
            'slug.unique' => 'Slug sudah dipakai, silakan ganti.',

            'excerpt.required' => 'Excerpt wajib diisi.',
            'excerpt.string' => 'Excerpt harus berupa teks.',
            'excerpt.max' => 'Excerpt maksimal 500 karakter.',

            'content.required' => 'Konten wajib diisi.',
            'content.string' => 'Konten harus berupa teks.',

            'thumbnail.image' => 'Thumbnail harus berupa file gambar.',
            'thumbnail.max' => 'Ukuran thumbnail maksimal 2MB.',

            'categories.required' => 'Kategori wajib dipilih minimal satu.',
            'categories.array' => 'Kategori tidak valid.',
            'categories.*.exists' => 'Kategori yang dipilih tidak valid.',
        ];

        // $validated = $request->validate([
        //     'title' => 'required|string|max:200',
        //     'slug' => 'required|string|max:255|unique:posts,slug',
        //     'excerpt' => 'required|string|max:500',
        //     'content' => 'required|string',
        //     'thumbnail' => 'required|image|max:2048',
        //     'categories' => 'required|array|min:1',
        //     'categories.*' => 'exists:categories,id',
        //     'meta_title' => 'nullable|string|max:255',
        //     'meta_description' => 'nullable|string|max:255',
        //     'meta_keywords' => 'nullable|string|max:255',
        // ], $messages);
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'required|string|max:255|unique:posts,slug',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'thumbnail' => 'required|image|max:2048',
            'categories' => 'required|array|min:1',
            'categories.*' => 'exists:categories,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:255',
        ], $messages);

        $slug = $validated['slug'] ?? Str::slug($validated['title']);
        $thumbnailPath = $request->file('thumbnail') ? $request->file('thumbnail')->store('uploads/thumbnails', 'public') : null;

        $user = auth()->user();
        $status = $user->role === 'admin' ? 'published' : 'pending';
        $publishedAt = $user->role === 'admin' ? now() : null;

        $post = Post::create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'slug' => $slug,
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'thumbnail' => $thumbnailPath,
            'status' => $status,
            'published_at' => $publishedAt,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
        ]);

        $post->categories()->attach($validated['categories']);

        return redirect()->route('posts.index')
            ->with('success', $status === 'published'
                ? 'Post berhasil dipublish.'
                : 'Post berhasil dikirim dan menunggu persetujuan admin.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $this->authorize('view', $post); // cek via PostPolicy

        $post->load(['author', 'categories', 'comments.user']); // eager load relasi

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $this->authorize('update', $post);

        // pastikan relasi categories di-load
        $post->load('categories');

        $categories = Category::all();

        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }
    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $messages = [
            'title.required' => 'Judul wajib diisi.',
            'title.string' => 'Judul harus berupa teks.',
            'title.max' => 'Judul maksimal 200 karakter.',
            'slug.unique' => 'Slug sudah dipakai, silakan ganti.',
            'excerpt.string' => 'Excerpt harus berupa teks.',
            'excerpt.max' => 'Excerpt maksimal 500 karakter.',
            'content.required' => 'Konten wajib diisi.',
            'content.string' => 'Konten harus berupa teks.',
            'thumbnail.image' => 'Thumbnail harus berupa file gambar.',
            'thumbnail.max' => 'Ukuran thumbnail maksimal 2MB.',
            'categories.array' => 'Kategori tidak valid.',
            'categories.*.exists' => 'Kategori yang dipilih tidak valid.',
        ];

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'required|string|max:255|unique:posts,slug,' . $post->id,
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'thumbnail' => 'required|image|max:2048',
            'categories' => 'required|array|min:1',
            'categories.*' => 'exists:categories,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:255',
        ], $messages);

        $slug = $validated['slug'] ?? Str::slug($validated['title']);

        $updateData = [
            'title' => $validated['title'],
            'slug' => $slug,
            'excerpt' => $validated['excerpt'] ?? $post->excerpt,
            'content' => $validated['content'],
            'meta_title' => $validated['meta_title'] ?? $post->meta_title,
            'meta_description' => $validated['meta_description'] ?? $post->meta_description,
            'meta_keywords' => $validated['meta_keywords'] ?? $post->meta_keywords,
        ];

        // Thumbnail jika ada file baru
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('uploads/thumbnails', 'public');
            $updateData['thumbnail'] = $thumbnailPath;
        }

        $post->update($updateData);

        // Sync kategori jika ada
        if (!empty($validated['categories'])) {
            $post->categories()->sync($validated['categories']);
        }

        return redirect()->route('posts.manage')
            ->with('success', 'Post berhasil diupdate.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        // Hapus thumbnail kalau ada
        if ($post->thumbnail && \Storage::exists("public/{$post->thumbnail}")) {
            \Storage::delete("public/{$post->thumbnail}");
        }

        $post->delete();

        return redirect()->back()->with('success', 'Post berhasil dihapus.');
    }

    public function manage(Request $request)
    {
        $user = auth()->user();

        $query = Post::with(['author', 'categories'])
            ->orderBy('created_at', 'desc');

        // Filter berdasarkan role
        if ($user->role === 'admin') {
            // Admin lihat semua post
            $query->where('status', 'published');
        } else {
            // Author cuma lihat post miliknya sendiri
            $query->where('user_id', $user->id)
                ->where('status', 'published');
        }

        // Filter search
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhereHas('author', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Pagination, misal 8 per halaman
        $posts = $query->paginate(8)->withQueryString();

        return Inertia::render('Posts/Manage/Index', [
            'posts' => $posts,
            'search' => $search,
            'auth' => ['user' => $user],
        ]);
    }


    public function pending()
    {
        $posts = Post::where('status', 'pending')
            ->with(['author', 'categories']) // load author + category
            ->get();

        return Inertia::render('Posts/Manage/Pending', [
            'posts' => $posts,
        ]);
    }


    public function approve(Post $post)
    {
        $post->update([
            'status' => 'published',
            'rejection_reason' => null,
            'published_at' => now(), // set waktu sekarang
        ]);

        return redirect()->back()->with('success', 'Post berhasil disetujui.');
    }
    // Reject
    public function reject(Request $request, Post $post)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $post->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason,
        ]);
        return redirect()->route('posts.pending')->with('success', 'Post ditolak.');
    }
    public function review(Post $post)
    {
        return Inertia::render('Posts/ReviewPost', ['post' => $post->load('author', 'category')]);
    }
}
