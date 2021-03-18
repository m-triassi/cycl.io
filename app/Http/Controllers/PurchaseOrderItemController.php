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

        // grab the list of item ids that will be attached to the purchase order
        $itemIds = $request->item_ids;

        // transfrom the string into an array by splitting the string on ","
        if (is_string($itemIds)) {
            $itemIds = trim($itemIds, " ,");
            $itemIds = Str::contains($itemIds, ",") ? explode(",", $itemIds) : [$itemIds];
        }

        // find the order to be update or 404 on non-existence
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        // attach the items to the order and save
        $purchaseOrder->order_items()->sync($itemIds);
        $purchaseOrder->save();

        return response([
            'success' => true,
            'data' => $purchaseOrder->with('order_items')->findOrFail($id)
        ]);
    }

}
