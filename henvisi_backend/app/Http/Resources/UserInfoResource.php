<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInfoResource extends JsonResource
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
            'name'=>$this->name,
            'email'=>$this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'job' => $this->job,
            'degree' => $this->degree,
            'birth_day' => $this->birth_day,
            'profilePic' => $this->profile_pic? url($this->profile_pic) : null,
            'experience' => $this->experience,
        ];
    }
}
