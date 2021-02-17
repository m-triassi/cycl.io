<?php

namespace App\Http\Controllers;

use App\Models\BillOfMaterial;
use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MaterialController extends Controller
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
        $assemblyId = $request->assembly_id;
        $materialIds = $request->material_ids;
        $pairs = collect();

        if(is_string($materialIds)) {
            $materialIds = trim($materialIds," ,");
            $materialIds = Str::contains($materialIds, ",") ? explode(",", $materialIds) : [$materialIds];
        }

        foreach($materialIds as $id) {
            $pairs->push([
                'assembly_id' => $assemblyId,
                'material_id' => trim($id),
            ]);
        }

        BillOfMaterial::insert($pairs->toArray());
        return InventoryItem::find($assemblyId)->materials;
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
