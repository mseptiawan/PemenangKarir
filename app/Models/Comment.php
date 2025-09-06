<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperComment
 */
class Comment extends Model
{
          protected $guarded = [];

    public function post() {
        return $this->belongsTo(Post::class, 'post_id', 'id');
    }

 public function children()
{
    return $this->hasMany(Comment::class, 'parent_id')->with('children.user')->orderBy('created_at','asc');
}

public function user()
{
    return $this->belongsTo(User::class);
}
    public function parent() {
        return $this->belongsTo(Comment::class, 'parent_id', 'id');
    }



}
