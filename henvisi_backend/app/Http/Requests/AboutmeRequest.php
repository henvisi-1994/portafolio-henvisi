<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Src\App\GuardarImagenIndividual;
use Src\Config\RutasStorage;
use Src\Shared\Utils;

class AboutmeRequest extends FormRequest
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
        'name' => 'required|min:3',
        'email' => 'required|email',
        'phone' => 'required',
        'address' => 'required',
        'degree' => 'required',
        'experience' => 'required',
        'birth_day' => 'required|date',
        'job' => 'required',
        'profile_pic' => 'nullable',
        ];
    }
    protected function prepareForValidation(){
        $this->merge([
            'profile_pic' => Utils::esBase64($this->profilePic)
            ? (new GuardarImagenIndividual($this->profilePic, RutasStorage::ABOUTME))->execute()
            : $this->profilePic,
        ]);
    }
}
