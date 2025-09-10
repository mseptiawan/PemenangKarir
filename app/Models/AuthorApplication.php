<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Str;

/**
 * @mixin IdeHelperAuthorApplication
 */
class AuthorApplication extends Model
{

    protected $guarded = [];
    protected $casts = [
        'social_links' => 'array', // <--- ini penting
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->full_name) . '-' . uniqid();
            }
        });
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by', 'id');
    }
    public function getProfilePhotoUrlAttribute()
    {
        if (!$this->profile_photo) {
            return '/images/profile.png';
        }

        return '/storage/' . str_replace('public/', '', $this->profile_photo);
    }
}
