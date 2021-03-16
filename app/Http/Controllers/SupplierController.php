<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'supplier_name' => "nullable|string|max:255"
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        $supplierName = $request->supplier_name;
        return response([
            'success' => true,
            'data' => Supplier::where('name', 'like', "%{$supplierName}%")->get()
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
        try {
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

        $params = $request->only([
            "name",
            "partnership_start_date",
            "partnership_end_date",
        ]);

        $item = Supplier::create($params);
        $item->save();

        return response([
            'success' => true,
            'data' => $item->refresh()
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
            'data' => Supplier::with('inventory_items')->findOrFail($id)
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
        $supplier = Supplier::findOrFail($id);
        try {
            $startDate = $request->partnership_start_date ?? $supplier->partnership_start_date;
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

        $params = $request->only([
            "name",
            "partnership_start_date",
            "partnership_end_date",
        ]);

        $supplier->update($params);
        return response([
            'success' => true,
            'data' => $supplier->refresh()
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
