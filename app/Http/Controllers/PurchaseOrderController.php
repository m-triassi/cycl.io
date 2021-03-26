<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the purchase order.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([
            'success' => true,
            'data' => PurchaseOrder::get()
        ]);
    }

    /**
     * Store a newly created purchase order in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // create a list of possible statuses
        $statuses = PurchaseOrder::PENDING . "," . PurchaseOrder::RECEIVED . "," . PurchaseOrder::CANCELLED;
        try {
            // validate the data to be stored is correct
            $request->validate([
                'supplier_id' => "required|integer|min:0",
                "status" => "string|in:{$statuses}",
                'delivery_date' => 'required|date|after:yesterday',
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // grab the data to be added from the request body
        $params = $request->only([
            "supplier_id",
            "status",
            "delivery_date",
        ]);

        // create a new purchase order with the passed data
        $purchaseOrder = PurchaseOrder::create($params);
        $purchaseOrder->save();

        return response([
            'success' => true,
            'data' => $purchaseOrder->refresh()
        ]);
    }

    /**
     * Display the specified purchase order.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response([
            'success' => true,
            'data' => PurchaseOrder::findOrFail($id)
        ]);
    }

    /**
     * Update the specified purchase order in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // create a list of possible statuses
        $statuses = PurchaseOrder::PENDING . "," . PurchaseOrder::RECEIVED . "," . PurchaseOrder::CANCELLED;
        try {
            // validate that the incoming data is correct
            $request->validate([
                "supplier_id" => "integer|min:0|exists:suppliers,id",
                "status" => "string|in:{$statuses}",
                "delivery_date" => "date|after:yesterday",
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // find the order to be updated, if non-existant 400
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        // grab the data to be used in updating
        $params = $request->only([
            "supplier_id",
            "status",
            "delivery_date",
        ]);

        // perform the update
        $purchaseOrder->update($params);
        return response([
            'success' => true,
            'data' => $purchaseOrder->refresh()
        ]);
    }

}
