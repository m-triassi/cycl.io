<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryItemController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SupplierItemController;
use App\Http\Controllers\PurchaseOrderItemController;
use App\Http\Controllers\StockReportController;
use App\Http\Controllers\PurchaseOrderController;

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

Route::get('/purchase-order', [PurchaseOrderController::class, "index"])->middleware(['auth']);
Route::get('/purchase-order/{id}', [PurchaseOrderController::class, "show"])->middleware(['auth']);
Route::post('/purchase-order', [PurchaseOrderController::class, "store"])->middleware(['auth']);
Route::put('/purchase-order/{id}', [PurchaseOrderController::class, "update"])->middleware(['auth']);

Route::put('/purchase-order/orderables/{id}', [PurchaseOrderItemController::class, "update"])->middleware(['auth']);

Route::get('/supplier', [SupplierController::class, "index"])->middleware(['auth']);
Route::get('/supplier/{id}', [SupplierController::class, "show"])->middleware(['auth']);
Route::post('/supplier', [SupplierController::class, "store"])->middleware(['auth']);
Route::put('/supplier/{id}', [SupplierController::class, "update"])->middleware(['auth']);


Route::post('/supplier/items', [SupplierItemController::class, "store"])->middleware(['auth']);

Route::get('/inventory/{id}', [InventoryItemController::class, 'show'])->middleware(['auth']);
Route::get('/inventory', [InventoryItemController::class, "index"])->middleware(['auth']);
Route::post('/inventory', [InventoryItemController::class, "store"])->middleware(['auth']);
Route::put('/inventory/{id}', [InventoryItemController::class, "update"])->middleware(['auth']);
Route::delete('/inventory/{id}', [InventoryItemController::class, "destroy"])->middleware(['auth']);

Route::get('/materials', [MaterialController::class, "index"])->middleware(['auth']);
Route::post('/materials', [MaterialController::class, "store"])->middleware(['auth']);
Route::get('/materials/{id}', [MaterialController::class, "show"])->middleware(['auth']);
Route::put('/materials/{id}', [MaterialController::class, "update"])->middleware(['auth']);

Route::post('/user/roles', [UserRoleController::class, 'store'])->middleware(['auth']);
Route::delete('/user/roles', [UserRoleController::class, 'destroy'])->middleware(['auth']);

Route::post('/roles', [RoleController::class, 'store'])->middleware(['auth']);

Route::get('/stock/report', [StockReportController::class, 'show'])->middleware(['auth']);

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
