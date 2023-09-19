<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nette\Utils\Image;

class Post extends Model
{
    use HasFactory;

    protected $guarded = false;

    protected $table = 'posts';

    protected $with = ['image'];

    public function image() {

        return $this->hasOne(PostImage::class,'post_id', 'id')
            ->whereNotNull('post_id');
    }

    public function getDateAttribute() {
        return $this->created_at->diffForHumans();
    }
}