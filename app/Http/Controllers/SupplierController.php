<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the suppliers.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            // check that the incoming filter is the correct format
            $request->validate([
                'supplier_name' => "nullable|string|max:255"
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // search the supplier list using the input filter as a fuzzy search
        $supplierName = $request->supplier_name;
        return response([
            'success' => true,
            'data' => Supplier::where('name', 'like', "%{$supplierName}%")->get()
        ]);
    }


    /**
     * Store a newly created supplier in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // validate the required data is present, or of the correct format
            $request->validate([
                'name' => "required|string",
                'partnership_start_date' => "required|date",
                'partnership_end_date' => 'nullable|date|after:partnership_start_date',
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // grab the data required to create a new suppluer
        $params = $request->only([
            "name",
            "partnership_start_date",
            "partnership_end_date",
        ]);

        $params['partnership_start_date'] = Carbon::make($params['partnership_start_date']);
        $params['partnership_end_date'] = Carbon::make($params['partnership_end_date']);

        // create the supplier
        $supplier = Supplier::create($params);
        $supplier->save();

        return response([
            'success' => true,
            'data' => $supplier->refresh()
        ]);
    }

    /**
     * Display the specified supplier.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response([
            'success' => true,
            'data' => Supplier::with('inventory_items')->findOrFail($id)
        ]);
    }

    /**
     * Update the specified supplier in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);
        try {
            // if the partnership start date isn't being updated, grab the existing one
            $startDate = $request->partnership_start_date ?? $supplier->partnership_start_date;
            // check the required data is present
            $request->validate([
                "name" => "nullable|string|max:255",
                "partnership_start_date" => "date",
                "partnership_end_date" => "nullable|date|after:{$startDate}",
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // grab the required info to update a supplier
        $params = $request->only([
            "name",
            "partnership_start_date",
            "partnership_end_date",
        ]);

        $params['partnership_start_date'] = Carbon::make($params['partnership_start_date']);
        $params['partnership_end_date'] = Carbon::make($params['partnership_end_date']);

        // update the supplier
        $supplier->update($params);
        return response([
            'success' => true,
            'data' => $supplier->refresh()
        ]);
    }

}
