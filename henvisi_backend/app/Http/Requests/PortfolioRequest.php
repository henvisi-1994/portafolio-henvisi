<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Src\App\GuardarImagenIndividual;
use Src\Config\RutasStorage;
use Src\Shared\Utils;

class PortfolioRequest extends FormRequest
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
            'title' => 'required|min:4',
                'project_url' => 'required',
                'image' => 'required|string',
                'cat_id' => 'required|exists:categories,id'
        ];
    }
    protected function prepareForValidation(){
        $this->merge([
            'image' => Utils::esBase64($this->image)
            ? (new GuardarImagenIndividual($this->image, RutasStorage::PORTAFOLIO))->execute()
            : $this->image,
        ]);
    }
}
