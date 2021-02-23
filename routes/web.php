<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryItemController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\UserRoleController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__.'/auth.php';

Route::get('/inventory', [InventoryItemController::class, "index"])->middleware(['auth']);
Route::post('/inventory', [InventoryItemController::class, "store"])->middleware(['auth']);
Route::put('/inventory/{id}', [InventoryItemController::class, "update"])->middleware(['auth']);
Route::delete('/inventory/{id}', [InventoryItemController::class, "destroy"])->middleware(['auth']);

Route::get('/materials', [MaterialController::class, "index"])->middleware(['auth']);   
Route::post('/material', [MaterialController::class, "store"])->middleware(['auth']);
Route::get('/materials/{id}', [MaterialController::class, "show"])->middleware(['auth']);

Route::post('/user/roles', [UserRoleController::class, 'store'])->middleware(['auth']);
Route::delete('/user/roles', [UserRoleController::class, 'destroy'])->middleware(['auth']);

Route::get('/token', function () {
    if(config("app.debug")){
        return csrf_token();
    } else {
        return false;
    }
});

Route::get('/{path}', function() {
   return view ('main', ['user' => auth()->user()]);
})->middleware(['auth'])->where('path', '.*');
