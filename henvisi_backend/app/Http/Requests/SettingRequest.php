<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Src\App\GuardarImagenIndividual;
use Src\Config\RutasStorage;
use Src\Shared\Utils;

class SettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'about_title' => 'required','min:3',
            'about_description' => 'required','min:10',
            'fb_url' => 'required|url',
            'github_url' => 'required|url',
            'linkedin_url' => 'required|url',
            'freelance_url' => 'required|url',
            'cv_url' => 'required|url',
            'video_url' => 'required|url',
            'contact_mail' => 'required|email',
            'about_photo' => 'nullable'
        ];
    }
    protected function prepareForValidation(){
        $this->merge([
            'about_photo' => Utils::esBase64($this->about_photo)
            ? (new GuardarImagenIndividual($this->about_photo, RutasStorage::SETTING))->execute()
            : $this->about_photo,
        ]);
    }
}
