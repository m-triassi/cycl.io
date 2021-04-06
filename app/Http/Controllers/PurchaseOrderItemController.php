<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class PurchaseOrderItemController extends Controller
{
    /**
     * Update the specified purchase order item in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            // validate the required data is present
            $request->validate([
                'item_ids' => "required"
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // If we didn't get a valid purchase order id, create one.
        if ($id == 0) {
            $purchaseOrder = PurchaseOrder::create($request->only([
                'supplier_id',
                'delivery_date',
                'status'
            ]));
            // make sure we have the latest values from the database
            $purchaseOrder = $purchaseOrder->refresh();
        } else {
            // otherwise find the purchase order we're looking for and 404 if it doesn't exist
            $purchaseOrder = PurchaseOrder::findOrFail($id);
        }

        // Get item ids from request data and parse into array
        $itemIds = $this->stringToArray($request->item_ids);

        // attach the items to the order and save
        $purchaseOrder->order_items()->sync($itemIds);
        $purchaseOrder->save();

        return response([
            'success' => true,
            'data' => $purchaseOrder->load('order_items')->refresh()
        ]);
    }

}
