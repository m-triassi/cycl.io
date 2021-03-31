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
     * Display a listing of the material.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // set a flag that will decide if we show items that are materials or items that are assembliies
        $isAssembly = $request->is_assembly;

        if($isAssembly){
            // show assemblies
            return response([
                'success' => true,
                'data' => InventoryItem::has("materials")->get()
            ]);
        }

        // show materials
        return response([
            'success' => true,
            'data' => InventoryItem::has("assemblies")->get()
        ]);
    }

    /**
     * Store a newly created material in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // collect the information to be attached
        $assemblyId = $request->assembly_id;
        $pairs = collect();
        $assembly = InventoryItem::findOrFail($assemblyId);
        $quantities = $this->stringToArray($request->quantities);
        $materialIds = $this->stringToArray($request->material_ids);

        // build a array in which we list each item to be attached and the quantity of each
        foreach($materialIds as $index => $id) {
            $pairs[$id] = [
                'quantity' => $quantities[$index] ?? 1
            ];
        }

        // attach all materials to the assembly
        $assembly->materials()->sync($pairs->toArray());
        return response([
            'success' => true,
            'data' => $assembly->refresh()->materials
        ]);
    }

    /**
     * Display the specified material.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // find the assembly to show the materials of or 404 if it doesn't exist
        $inventoryItem = InventoryItem::findOrFail($id);
        return response([
            'success' => true,
            'data' => $inventoryItem->materials()->get()
        ]);
    }

    /**
     * Update the specified material in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            // check the required values are passed in
            $request->validate([
                'material_ids' => 'required'
            ]);
        } catch (ValidationException $e) {
            // report they are missing if they are
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // collect all the information to be changed
        $pairs = collect();
        $assembly = InventoryItem::findOrFail($id);
        $quantities = $this->stringToArray($request->quantities);
        $materialIds = $this->stringToArray($request->material_ids);

        // build an associative array that updates the materials on the assembly and their quantities
        foreach($materialIds as $index => $materialId) {
            $pairs[$materialId] = [
                'quantity' => $quantities[$index] ?? 1
            ];
        }

        // save the material on the assembly
        $assembly->materials()->sync($pairs->toArray());
        return response([
            'success' => true,
            'data' => $assembly->refresh()->materials
        ]);
    }


    /**
     * Transforms a comma seperated list of IDs into an array cleanly
     *
     * @param $input
     * @return array
     */
    private function stringToArray($input) : array
    {
        // detect if the input is a string, if it is split it into an array on "," otherwise cast it to an array
        return is_string($input) ? explode(',', str_replace(" ", "", $input))
            : (array) $input;
    }
}
