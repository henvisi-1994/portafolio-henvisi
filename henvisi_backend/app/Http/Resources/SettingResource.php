<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
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
            'about_title'=>$this->about_title,
            'about_description'=>$this->about_description,
            'about_photo' => $this->about_photo ? url($this->about_photo) : null,
            'fb_url' => $this->fb_url,
            'github_url' => $this->github_url,
            'linkedin_url' => $this->linkedin_url,
            'freelance_url' => $this->freelance_url,
            'cv_url' => $this->cv_url,
            'video_url' => $this->video_url,
            'contact_mail' => $this->contact_mail,

        ];;
    }
}
