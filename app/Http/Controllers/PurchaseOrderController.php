<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
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
        $statuses = PurchaseOrder::PENDING . "," . PurchaseOrder::RECEIVED;
        try {
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

        $params = $request->only([
            "supplier_id",
            "status",
            "delivery_date",
        ]);

        $purchaseOrder = PurchaseOrder::create($params);
        $purchaseOrder->save();

        return response([
            'success' => true,
            'data' => $purchaseOrder->refresh()
        ]);
    }

    /**
     * Display the specified resource.
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
        $statuses = PurchaseOrder::PENDING . "," . PurchaseOrder::RECEIVED;
        try {
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
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        $params = $request->only([
            "supplier_id",
            "status",
            "delivery_date",
        ]);

        $purchaseOrder->update($params);
        return response([
            'success' => true,
            'data' => $purchaseOrder->refresh()
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
