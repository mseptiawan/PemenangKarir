<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperPostImage
 */
class PostImage extends Model
{
 protected $table = 'post_images';
  
     protected $guarded = [];

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id', 'id'); // PK Post default 'id'
    }
}
