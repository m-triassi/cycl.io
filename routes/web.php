<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryItemController;

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

Route::put('/inventory/{id}', [InventoryItemController::class, "update"]);

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
