<?php

use App\Http\Controllers\Admin\AboutmeController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\QualificationController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources(
    [
        'qualification' => QualificationController::class,
        'skill' => SkillController::class,
        'service' => ServiceController::class,
        'review' => ReviewController::class,
        'category' => CategoryController::class,
        'portfolio' => PortfolioController::class,
        'aboutme' => AboutmeController::class,
        'setting' => SettingController::class
    ],
    [
        'parameters' => [

        ],
        'middleware' => ['auth:sanctum']
    ]
);
Route::get('/', [AdminController::class, 'index'])->name('index');
Route::get('/qualification/education', [QualificationController::class,'showEducation'])->name('qualification.edu');
Route::get('/qualification/experience', [QualificationController::class,'showExperience'])->name('qualification.exp');
Route::get('/portfolio/search', [PortfolioController::class,'search'])->name('portfolio.search');
Route::post('/usuarios/login', [AuthController::class, 'login']);
