<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AboutmeRequest;
use App\Http\Resources\UserInfoResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Src\Shared\Utils;

class AboutmeController extends Controller
{
    private $entidad = "About Me";

    public function index()
    {
        $user = User::select(
            'id',
            'name',
            'email',
            'phone',
            'address',
            'job',
            'degree',
            'birth_day',
            'profile_pic',
            'experience'
        )->where('id', 1)->first();
        $model = new UserInfoResource($user);
        return  compact('model');
    }

    public function update(AboutmeRequest $request, User $user)
    {
        try {
            DB::beginTransaction();
            $user = User::first();
            $validated = $request->validated();
            $user->update($validated);
            $modelo = $user;
            $mensaje = Utils::obtenerMensaje($this->entidad, 'store');
            DB::commit();
            return response()->json(compact('mensaje', 'modelo'));
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al insertar' => [$e->getMessage()],
            ]);
        }
    }
}
