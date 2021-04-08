<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SaleController extends Controller
{
    /**
     * Display a listing of the sales.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            // check that the incoming filter is the correct format
            $request->validate([
                'status' => "nullable|string|max:255"
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // search the status list using the input filter as a fuzzy search
        $status = $request->status;
        // instantiate an empty Sale query
        $sale = Sale::query();

        // if a status is passed, apply it as a filter
        if ($status) {
            $sale = $sale->where('status', "{$status}");
        }

        return response([
            'success' => true,
            'data' => $sale->get()
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
        // create a list of possible statuses
        $statuses = $this->getSaleStatuses();
        $paymentTypes = $this->getPaymentTypes();
        try {
            // validate the data to be stored is correct
            $request->validate([
                'client_name' => 'required|string|max:255',
                "status" => "string|in:{$statuses}",
                "payment_type" => "required|string|in:{$paymentTypes}",
                'card_number' => 'required|string|size:16|regex:/^[0-9]*$/',
                'cardholder_name' => 'required|string|max:255',
                'price' => 'numeric|min:0',
                'description'=>'string|max:255',
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

        // create a new sale with the passed data
        $sale = Sale::create($params);

        return response([
            'success' => true,
            'data' => $sale->refresh()
        ]);
    }

    /**
     * Display the specified sale.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response([
            'success' => true,
            'data' => Sale::findOrFail($id)
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
        // create a list of possible statuses
        $statuses = $this->getSaleStatuses();
        $paymentTypes = $this->getPaymentTypes();
        try {
            // validate the data to be stored is correct
            $request->validate([
                'client_name' => 'string|max:255',
                "status" => "string|in:{$statuses}",
                "payment_type" => "string|in:{$paymentTypes}",
                'card_number' => 'string|size:16',
                'price' => 'numeric|min:0',
                'description' => 'string|max:255',
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // find the sale to be updated, if non-existant 400
        $sale = Sale::findOrFail($id);

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

        // create a new sale with the passed data
        $sale->update($params);
        return response([
            'success' => true,
            'data' => $sale->refresh()
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


    /**
     * Return comma-seperated string containing all sale statuses
     *
     * @return string
     */
    private function getSaleStatuses(): string
    {
        return Sale::PENDING . "," . Sale::SHIPPED . "," . Sale::CANCELLED . "," . Sale::PAID;
    }

    /**
     * Return comma-seperated string containing all payment types
     *
     * @return string
     */
    private function getPaymentTypes(): string
    {
        return Sale::VISA . "," . Sale::MASTER_CARD;
    }
}
