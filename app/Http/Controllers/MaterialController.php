<?php

namespace App\Http\Controllers;

use App\Models\BillOfMaterial;
use App\Models\InventoryItem;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $isAssembly = $request->is_assembly;

        if($isAssembly){
            return response([
                'success' => true,
                'data' => InventoryItem::has("materials")->get()
            ]);
        }

        return response([
            'success' => true,
            'data' => InventoryItem::has("assemblies")->get()
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
        $assemblyId = $request->assembly_id;
        $pairs = collect();
        $assembly = InventoryItem::findOrFail($assemblyId);
        $quantities = $this->stringToArray($request->quantities);
        $materialIds = $this->stringToArray($request->material_ids);

        foreach($materialIds as $index => $id) {
            $pairs[$id] = [
                'quantity' => $quantities[$index] ?? 1
            ];
        }

        $assembly->materials()->sync($pairs->toArray());
        return response([
            'success' => true,
            'data' => $assembly->refresh()->materials
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
        $inventoryItem = InventoryItem::findOrFail($id);
        return response([
            'success' => true,
            'data' => $inventoryItem->materials()->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
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
                'material_ids' => 'required'
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        $pairs = collect();
        $assembly = InventoryItem::findOrFail($id);
        $quantities = $this->stringToArray($request->quantities);
        $materialIds = $this->stringToArray($request->material_ids);

        foreach($materialIds as $index => $materialId) {
            $pairs[$materialId] = [
                'quantity' => $quantities[$index] ?? 1
            ];
        }

        $assembly->materials()->sync($pairs->toArray());
        return response([
            'success' => true,
            'data' => $assembly->refresh()->materials
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
     * Transforms a comma seperated list of IDs into an array cleanly
     *
     * @param $input
     * @return array
     */
    private function stringToArray($input) : array
    {
        return is_string($input) ? explode(',', str_replace(" ", "", $input))
            : (array) $input;
    }
}
