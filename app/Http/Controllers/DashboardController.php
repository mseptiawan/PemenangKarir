<?php

namespace App\Http\Controllers;

use App\Models\AuthorApplication;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Statistik semua author & post (untuk admin)
        $lastApplicant = AuthorApplication::latest()->first();
        $lastPost = Post::latest()->first();

        $authorStats = [
            'total'    => AuthorApplication::count(),
            'pending'  => AuthorApplication::where('status', 'pending')->count(),
            'approved' => AuthorApplication::where('status', 'approved')->count(),
            'rejected' => AuthorApplication::where('status', 'rejected')->count(),
        ];

        $postsStats = [
            'total'     => Post::count(),
            'pending'   => Post::where('status', 'pending')->count(),
            'published' => Post::where('status', 'published')->count(),
            'rejected'  => Post::where('status', 'rejected')->count(),
        ];

        $approvedPercentPost = $postsStats['total'] > 0
            ? ($postsStats['published'] / $postsStats['total']) * 100
            : 0;

        // Statistik post khusus author
        $authorPostsStats = null;
        $lastAuthorPost = null;
        if ($user->role === 'author') {
            $authorPosts = Post::where('user_id', $user->id);
            $authorPostsStats = [
                'total'     => Post::where('user_id', $user->id)->count(),
                'pending'   => Post::where('user_id', $user->id)->where('status', 'pending')->count(),
                'published' => Post::where('user_id', $user->id)->where('status', 'published')->count(),
                'rejected'  => Post::where('user_id', $user->id)->where('status', 'rejected')->count(),
            ];

            $lastAuthorPostModel = Post::where('user_id', $user->id)->latest()->first();
            $lastAuthorPost = $lastAuthorPostModel
                ? [
                    'title'  => $lastAuthorPostModel->title,
                    'status' => $lastAuthorPostModel->status,
                ]
                : null;
        }

        return Inertia::render('Dashboard', [
            'categories'          => Category::all(),
            'authorStats'         => $authorStats,
            'lastApplicant'       => $lastApplicant
                ? [
                    'name'  => $lastApplicant->full_name,
                    'email' => $lastApplicant->email,
                ]
                : null,
            'postsStats'          => $postsStats,
            'approvedPercentPost' => $approvedPercentPost,
            'lastPost'            => $lastPost
                ? [
                    'title'  => $lastPost->title,
                    'author' => $lastPost->author->name ?? 'Unknown',
                ]
                : null,
            // tambahan untuk author
            'authorPostsStats'    => $authorPostsStats,
            'lastAuthorPost'      => $lastAuthorPost,
        ]);
    }
}
