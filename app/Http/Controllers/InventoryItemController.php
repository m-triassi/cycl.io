<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use Illuminate\Http\Request;

/**
 * Class InventoryItemController
 * @package App\Http\Controllers
 */
class InventoryItemController extends Controller
{
    /**
     * update
     * Updates inventory item information on put request.
     * @param Request $request
     * @param $id
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, $id)
    {
        //validate function seems to be breaking on invalid, possibly due to the wildcard route.
        //TODO: Look into validating with wildcard route
        /*$request->validate([
            "supplier_id" => "nullable|integer|min:1",
            "title" => "nullable|string|max:255",
            "description" => "nullable|string|max:255",
            "cost" => "nullable|numeric|min:0",
            "sale_price" => "nullable|numeric|min:0",
            "stock" => "nullable|integer|min:0",
            "category" => "nullable|string|max:255",
            "size" => "nullable|string|max:255",
            "color" => "nullable|string|max:255",
            "finish" => "nullable|string|max:255",
            "material" => "nullable|string|max:255",
            "part_number" => "nullable|string|max:255",
            "lead_time" => "nullable|numeric|min:0",
            "labour_cost" => "nullable|numeric|min:0"
        ]);*/

        $inventoryItem = InventoryItem::findOrFail($id);

        $params = $request->only([
            "supplier_id",
            "title",
            "description",
            "cost",
            "sale_price",
            "stock",
            "category",
            "size",
            "color",
            "finish",
            "material",
            "part_number",
            "lead_time",
            "labour_cost"
        ]);

        $inventoryItem->update($params);

        return $inventoryItem->refresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $inventoryItem = InventoryItem::findOrFail($id);
        $inventoryItem->delete();
    }
}
