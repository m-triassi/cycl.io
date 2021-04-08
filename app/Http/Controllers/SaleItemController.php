<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SaleItemController extends Controller
{

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // create a list of possible statuses
        $statuses = Sale::PENDING . "," . Sale::SHIPPED . "," . Sale::PAID . "," . Sale::CANCELLED;
        $paymentTypes = Sale::VISA . "," . Sale::MASTER_CARD;
        try {
            // validate the required data is present
            $request->validate([
                'item_ids' => "required",
                'client_name' => "string|max:255",
                'status' => "string|in:{$statuses}",
                'payment_type' => "string|in:{$paymentTypes}",
                'card_number' => "string|size:16|regex:/^[0-9]*$/",
                'cardholder_name' => "string|max:255",
                'price' => "numeric|min:0",
                'description' => "string|max:255",
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // If we didn't get a valid purchase order id, create one.
        if ($id == 0) {
            $sale = Sale::create($request->only([
                'delivery_date',
                'client_name',
                'status',
                'payment_type',
                'card_number',
                'cardholder_name',
                'price',
                'description',
            ]));

            // make sure we have the latest values from the database
            $sale = $sale->refresh();
        } else {
            // otherwise find the purchase order we're looking for and 404 if it doesn't exist
            $sale = Sale::findOrFail($id);
        }

        $itemIds = $request->item_ids;

        // transform the
        if (is_string($itemIds)) {
            $itemIds = trim($itemIds, " ,");
            $itemIds = Str::contains($itemIds, ",") ? explode(",", $itemIds) : [$itemIds];
        }
        
        // attach the items to the order and save
        $sale->order_items()->sync($itemIds);
        $sale->price = $request->price ?? $sale->calculatePrice();
        $sale->save();

        return response([
            'success' => true,
            'data' => $sale->load('order_items')->refresh()
        ]);
    }

}
