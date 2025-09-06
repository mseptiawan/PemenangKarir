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
        $query = Post::with(['author', 'category'])
            ->where('status', 'published') // 👈 filter di sini
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

        $posts = $query->get();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'search' => $search,
        ]);
    }
    public function index2(Request $request)
    {
        $query = Post::with(['author', 'category'])
            ->where('status', 'published') // 👈 filter di sini
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

        $posts = $query->get();

        return Inertia::render('Posts/Index2', [
            'posts' => $posts,
            'search' => $search,
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
        $this->authorize('create', Post::class); // cek via PostPolicy

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required',
            'thumbnail' => 'nullable|image|max:2048',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $slug = $request->slug ?? Str::slug($request->title);
        $thumbnailPath = $request->file('thumbnail')?->store('uploads/thumbnails', 'public');

        $user = auth()->user();
        $status = $user->role === 'admin' ? 'published' : 'pending';
        $publishedAt = $user->role === 'admin' ? now() : null;

        Post::create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'slug' => $slug,
            'excerpt' => $request->excerpt,
            'content' => $validated['content'],
            'thumbnail' => $thumbnailPath,
            'status' => $status,
            'published_at' => $publishedAt,
            'category_id' => $request->category_id,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_keywords' => $request->meta_keywords,
        ]);

        return redirect()->route('posts.index')
            ->with('success', $status === 'published'
                ? 'Post berhasil dipublish.'
                : 'Post dikirim, menunggu persetujuan admin.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $this->authorize('view', $post); // cek via PostPolicy

        $post->load(['author', 'category', 'comments.user']); // eager load relasi

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $this->authorize('update', $post); // cek via PostPolicy

        $categories = Category::all();

        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }


    // Update post
    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required',
            'thumbnail' => 'nullable|image|max:2048',
            'images.*' => 'nullable|image|max:2048',
        ]);

        $slug = $request->slug ?? Str::slug($request->title);

        // Update thumbnail jika ada file baru
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('uploads/thumbnails', 'public');
            $post->thumbnail = $thumbnailPath;
        }

        // Update data post
        $post->update([
            'title' => $validated['title'],
            'slug' => $slug,
            'excerpt' => $request->excerpt,
            'content' => $validated['content'],
            'status' => $request->status,
            'category_id' => $request->category_id,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_keywords' => $request->meta_keywords,
        ]);

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



    public function manage()
    {
        $user = auth()->user(); // <--- ini penting

        if ($user->role === 'admin') {
            // Admin lihat semua post
            $posts = Post::with(['author', 'category'])
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            // Author cuma lihat post miliknya sendiri
            $posts = Post::with(['author', 'category'])
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        // Kirim ke Inertia
        return Inertia::render('Posts/Manage', [
            'posts' => $posts,
            'auth' => [
                'user' => $user,
            ],
        ]);
    }
    public function pending()
    {
        $posts = Post::where('status', 'pending')
            ->with(['author', 'category']) // load author + category
            ->get();

        return Inertia::render('Posts/Pending', [
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
