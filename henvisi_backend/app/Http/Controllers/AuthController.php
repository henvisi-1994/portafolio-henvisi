<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserInfoResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function getUsuario(Request $request){
        $modelo = new UserInfoResource($request->user());
        return response()->json([ 'modelo' => $modelo], 200);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required',
        ]);
        $user = User::where('email', $request['email'])->first();
        if (!$user) {
            throw ValidationException::withMessages([
                '404' => ['Usuario no registrado!'],
            ]);
        }

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Usuario o contraseña incorrectos'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $modelo = new UserInfoResource($user);
        return response()->json(['mensaje' => 'Usuario autenticado con éxito', 'access_token' => $token, 'token_type' => 'Bearer', 'modelo' => $modelo], 200);

    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
    }

}
