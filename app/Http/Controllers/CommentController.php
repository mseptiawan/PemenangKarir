<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CommentController extends Controller
{

    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'content'    => 'required|string|max:2000',
            'parent_id'  => 'nullable|exists:comments,id',
            'guest_name' => 'nullable|string|max:100',
        ]);

        $guestToken = null;

        // kalau guest (tidak login)
        if (!$request->user()) {
            if (!session()->has('guest_token')) {
                session()->put('guest_token', (string) Str::uuid());
            }
            $guestToken = session()->get('guest_token');
        }

        $post->comments()->create([
            'user_id'     => $request->user()->id ?? null,
            'guest_name'  => $request->user() ? null : $validated['guest_name'],
            'guest_token' => $guestToken,
            'content'     => $validated['content'],
            'parent_id'   => $validated['parent_id'] ?? null,
        ]);

        return redirect()->back();
    }

    public function edit(Comment $comment)
    {
        $this->authorize('update', $comment);

        return inertia('Posts/EditComment', [
            'comment' => $comment
        ]);
    }
    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $validated = $request->validate([
            'content' => 'required|string|max:2000',
        ]);

        $comment->update($validated);

        return redirect()->back()->with('success', 'Komentar berhasil diupdate.');
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);

        $comment->delete();

        return redirect()->back()->with('success', 'Komentar berhasil dihapus.');
    }
}
