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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
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

        $itemIds = $request->item_ids;

        // transform the
        if (is_string($itemIds)) {
            $itemIds = trim($itemIds, " ,");
            $itemIds = Str::contains($itemIds, ",") ? explode(",", $itemIds) : [$itemIds];
        }


        $purchaseOrder->order_items()->sync($itemIds);
        $purchaseOrder->save();

        return response([
            'success' => true,
            'data' => $purchaseOrder->load('order_items')->refresh()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
