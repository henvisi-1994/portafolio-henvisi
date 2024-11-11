<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortafolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'title'=>$this->title,
            'project_url'=>$this->project_url,
            'image' => $this->image ? url($this->image) : null,
            'cat_id' => $this->cat_id,
            'category' => $this->category,
            'name_category' => $this->category?->name,

        ];
    }
}
