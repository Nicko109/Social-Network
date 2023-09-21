<?php

namespace App\Http\Resources\Comment;

use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $url = isset($this->image) ? $this->image->url : null;

        return [
            'id' => $this->id,
            'body' => $this->body,
            'date' => $this->date,
            'user' => new UserResource($this->user),

        ];
    }
}
