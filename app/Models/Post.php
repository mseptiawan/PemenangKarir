<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperPost
 */
class Post extends Model
{
    protected $guarded = []; // gunakan guarded atau fillable sesuai kebutuhan

    // Relasi ke User
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id', 'id'); // default PK User itu 'id'
    }

    // Relasi ke Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id'); // default PK Category 'id'
    }

    // Relasi ke banyak gambar
    public function images()
    {
        return $this->hasMany(PostImage::class, 'post_id', 'id'); // PK Post default 'id'
    }

    // Relasi ke komentar
 public function comments()
{
    // hanya top-level comments, children eager loaded
    return $this->hasMany(Comment::class)
                ->whereNull('parent_id')
                ->with(['children.user'])
                ->orderBy('created_at', 'desc');
}
     protected static function booted()
    {
        static::creating(function ($post) {
            if ($post->status === 'published' && !$post->published_at) {
                $post->published_at = now();
            }
        });
    }
    public function getRouteKeyName()
{
    return 'slug';
}
}
