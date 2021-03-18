<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SupplierItemController extends Controller
{
    /**
     * Attach an existing item to an existing supplier.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // valdiate that the required info is present and valid
            $request->validate([
                'item_id' => "required|integer|min:1",
                'supplier_id' => "required|integer|min:1"
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // fetch the required information from the request body
        $itemId = $request->item_id;
        $supplierId = $request->supplier_id;

        // the required item and supplier, and 404 when non-exsistent
        $item = InventoryItem::findOrFail($itemId);
        $supplier = Supplier::findOrFail($supplierId);

        $item->supplier()->associate($supplier);
        $item->save();

        return response([
            'success' => true,
            'data' => $item->refresh()->supplier
        ]);
    }
}
