<?php

namespace Src\App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SessionService
{
    private $key = '';
    private $value = '';

    public function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }
    public function storeSession(Request $request)
    {
        $_SESSION[$this->key] = $this->value;
    }

    public function getSession(Request $request)
    {
        // Iniciar la sesión de PHP
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        // Obtener la variable de sesión
        $value = isset($_SESSION[$this->key]) ? $_SESSION[$this->key] : null;
        return $value;
    }

    public function forgetSession(Request $request)
    {
        $request->session()->forget($this->key);
    }
    public function  setIdentificador($key)
    {
        $this->key = $key;
    }
    public function  setValue(String $value)
    {
        $this->value = $value;
    }
}
