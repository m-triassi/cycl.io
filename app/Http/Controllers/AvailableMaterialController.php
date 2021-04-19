<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class AvailableMaterialController extends Controller
{
    /**
     * Display a listing of the inventory items that are valid for attaching as a material to item_id.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get the relevant inventory item and its materials
        $itemId = $request->item_id;
        $assembly = InventoryItem::with('materials')->findOrFail($itemId);

        // get all inventory items excluding the chosen item and its materials
        return response([
            'success' => true,
            'data' => InventoryItem::whereNotIn('id', $assembly->materials->pluck('id')->push($itemId))->get()
        ]);
    }
}
