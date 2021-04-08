<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\InventoryItemController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SupplierItemController;
use App\Http\Controllers\PurchaseOrderItemController;
use App\Http\Controllers\StockReportController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\SaleItemController;

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

Route::middleware(['auth'])->group(function () {
    Route::get('/sale', [SaleController::class, "index"]);
    Route::get('/sale/{id}', [SaleController::class, "show"]);
    Route::post('/sale', [SaleController::class, "store"]);
    Route::put('/sale/{id}', [SaleController::class, "update"]);
    Route::put('/sale/orderables/{id}', [SaleItemController::class, "update"]);

    Route::get('/purchase-order', [PurchaseOrderController::class, "index"]);
    Route::get('/purchase-order/{id}', [PurchaseOrderController::class, "show"]);
    Route::post('/purchase-order', [PurchaseOrderController::class, "store"]);
    Route::put('/purchase-order/{id}', [PurchaseOrderController::class, "update"]);

    Route::put('/purchase-order/orderables/{id}', [PurchaseOrderItemController::class, "update"]);

    Route::get('/supplier', [SupplierController::class, "index"]);
    Route::get('/supplier/{id}', [SupplierController::class, "show"]);
    Route::post('/supplier', [SupplierController::class, "store"]);
    Route::put('/supplier/{id}', [SupplierController::class, "update"]);


    Route::post('/supplier/items', [SupplierItemController::class, "store"]);

    Route::get('/inventory/{id}', [InventoryItemController::class, 'show']);
    Route::get('/inventory', [InventoryItemController::class, "index"]);
    Route::post('/inventory', [InventoryItemController::class, "store"]);
    Route::put('/inventory/{id}', [InventoryItemController::class, "update"]);
    Route::delete('/inventory/{id}', [InventoryItemController::class, "destroy"]);

    Route::get('/materials', [MaterialController::class, "index"]);
    Route::post('/materials', [MaterialController::class, "store"]);
    Route::get('/materials/{id}', [MaterialController::class, "show"]);
    Route::put('/materials/{id}', [MaterialController::class, "update"]);

    Route::post('/user/roles', [UserRoleController::class, 'store']);
    Route::delete('/user/roles', [UserRoleController::class, 'destroy']);

    Route::post('/roles', [RoleController::class, 'store']);

    Route::get('/stock/report', [StockReportController::class, 'show']);
});

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
