<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class RestorePostController extends Controller
{
    public function index()
    {
        $posts = Post::onlyTrashed()->get(); // Ambil semua soft deleted
        return inertia('Restore/Index', compact('posts'));
    }

    public function restore($id)
    {
        $post = Post::withTrashed()->findOrFail($id);

        // Cek hak akses
        if (Auth::user()->role !== 'admin' && Auth::id() !== $post->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $post->restore();

        return redirect()->back()->with('success', 'Post berhasil dipulihkan.');
    }

    public function restoreSelected(Request $request)
    {
        $ids = $request->ids; // array of post ids
        $posts = Post::withTrashed()->whereIn('id', $ids)->get();

        foreach ($posts as $post) {
            if (Auth::user()->role === 'admin' || Auth::id() === $post->user_id) {
                $post->restore();
            }
        }

        return redirect()->back()->with('success', 'Post terpilih berhasil dipulihkan.');
    }
    public function forceDelete($id)
    {
        $post = Post::withTrashed()->findOrFail($id);

        if (Auth::user()->role !== 'admin' && Auth::id() !== $post->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $post->forceDelete();

        return back()->with('success', 'Post berhasil dihapus permanen.');
    }
    public function forceDeleteSelected(Request $request)
    {
        $ids = $request->input('ids', []); // default array kosong kalau null

        if (!is_array($ids) || count($ids) === 0) {
            return back()->with('error', 'Tidak ada post yang dipilih.');
        }

        $posts = Post::withTrashed()->whereIn('id', $ids)->get();

        foreach ($posts as $post) {
            if (Auth::user()->role === 'admin' || Auth::id() === $post->user_id) {
                $post->forceDelete();
            }
        }

        return back()->with('success', 'Post terpilih berhasil dihapus permanen.');
    }
}
