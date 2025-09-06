<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperAuthorApplication
 */
class AuthorApplication extends Model
{

    protected $guarded = [];
    protected $casts = [
        'social_links' => 'array', // <--- ini penting
    ];
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
