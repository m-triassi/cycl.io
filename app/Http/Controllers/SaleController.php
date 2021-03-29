<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
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
        // create a list of possible statuses
        $statuses = Sale::PENDING . "," . Sale::RECEIVED . "," . Sale::PAID . "," . Sale::CANCELLED;
        $paymentTypes = Sale::VISA . "," . Sale::MASTER_CARD;
        try {
            // validate the data to be stored is correct
            $request->validate([
                'client_name' => 'required|string',
                "status" => "string|in:{$statuses}",
                "payment_type" => "string|in:{$paymentTypes}",
                'card_number' => 'required|string|size:16',
                'cardholder_name' => 'required|string',
                'price' => 'required',

            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // grab the data to be added from the request body
        $params = $request->only([
            "client_name",
            "status",
            "payment_type",
            "card_number",
            "cardholder_name",
            "price",
            "description",
        ]);

        // create a new purchase order with the passed data
        $sale = Sale::create($params);
        $sale->save();

        return response([
            'success' => true,
            'data' => $sale->refresh()
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
        //
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
