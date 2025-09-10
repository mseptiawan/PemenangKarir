<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\AuthorApplicationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestorePostController;
use App\Http\Controllers\SubscribeController;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Landing');
})->name('home');

use App\Models\Category;

// Route::get('/dashboard', function () {
//     $user = auth()->user();

//     $categories = Category::all(); // <--- tambahkan ini

//     if ($user->role === 'admin') {
//         $posts = Post::with(['author', 'category'])
//             ->orderBy('created_at', 'desc')
//             ->get();
//     } else {
//         $posts = Post::with(['author', 'category'])
//             ->where('user_id', $user->id)
//             ->orderBy('created_at', 'desc')
//             ->get();
//     }

//     return Inertia::render('Dashboard', [
//         'posts' => $posts,
//         'categories' => $categories, // <--- kirim ke Inertia
//     ]);
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/password/edit', [ProfileController::class, 'editPassword'])->name('password.edit');
    Route::post('/profile-update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])
        ->name('profile.avatar.update');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/restore-posts', [RestorePostController::class, 'index'])->name('restore.index');
    Route::post('/restore-posts/{id}', [RestorePostController::class, 'restore'])->name('restore.restore');
    Route::post('/restore-posts', [RestorePostController::class, 'restoreSelected'])->name('restore.restoreSelected');
    // routes/web.php
    Route::delete('/restore/{id}/force-delete', [RestorePostController::class, 'forceDelete'])
        ->name('restore.forceDelete');
    Route::delete('/restore/force-delete-selected', [RestorePostController::class, 'forceDeleteSelected'])
        ->name('restore.forceDeleteSelected');
});
Route::middleware(['auth', 'admin', 'verified'])->group(function () {
    Route::resource('categories', CategoryController::class);
});


// custom dulu
Route::get('/posts/blog-home', [PostController::class, 'indexForGuest'])->name('posts.indexForGuest');
Route::get('/posts/pending', [PostController::class, 'pending'])->name('posts.pending');
Route::get('/posts/manage', [PostController::class, 'manage'])->name('posts.manage');
Route::resource('posts.comments', CommentController::class)->shallow();

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('posts', PostController::class)->except(['index', 'show']);
});

// Public (index & show)
Route::resource('posts', PostController::class)->only(['index', 'show']);

// Admin only
Route::middleware(['auth', 'admin', 'verified'])->group(function () {
    Route::post('/posts/{post}/approve', [PostController::class, 'approve'])->name('posts.approve');
    Route::post('/posts/{post}/reject', [PostController::class, 'reject'])->name('posts.reject');
});


Route::get('/author/create', [AuthorApplicationController::class, 'create'])->name('author.create');
Route::post('/author', [AuthorApplicationController::class, 'store'])->name('author.store');

Route::middleware(['auth', 'verified'])->group(function () {
    // ====================
    // Routes reader / author
    // ====================
    Route::middleware('reader')->group(function () {});

    Route::middleware('author')->group(function () {
        Route::get('/author/my-applications', [AuthorApplicationController::class, 'myApplications'])->name('author.myApplications');
    });
    // ====================
    // Routes admin
    // ====================
    Route::middleware('admin')->group(function () {
        Route::get('/author', [AuthorApplicationController::class, 'index'])->name('author.index');
        Route::get('/author/{application:slug}', [AuthorApplicationController::class, 'show'])
            ->name('author.applications.show');


        Route::post('/author/applications/{application}/approve', [AuthorApplicationController::class, 'approve'])->name('author.applications.approve');
        Route::post('/author/applications/{application}/reject', [AuthorApplicationController::class, 'reject'])->name('author.applications.reject');
    });
});

Route::get('/contact', function () {
    return Inertia::render("Contact");
})->name("contact");

Route::get('/portfolio', function () {
    return Inertia::render("Portfolio");
})->name("portfolio");

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout')
    ->middleware('auth');
// Route::get('/posts/create', [PostController::class, 'craete'])->name('posts.create');


Route::get('/author-rules', function () {
    return Inertia::render("Author/Index");
})->name("apply");
// routes/web.php
// routes/web.php

Route::get('/test-mail', function () {
    \Mail::raw('Tes email ForgotPassword Laravel!', function ($message) {
        $message->to('growtopiaebr@gmail.com')
            ->subject('Tes Gmail Laravel');
    });
    return 'Email berhasil dikirim!';
});


Route::post('/subscribe', [SubscribeController::class, 'store'])->name('subscribe.store');
Route::fallback(function () {
    return Inertia::render('NotFound');
});
require __DIR__ . '/auth.php';
