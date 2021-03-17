<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

/**
 * Class InventoryItemController
 * @package App\Http\Controllers
 */
class InventoryItemController extends Controller
{

    public function show($id)
    {
        return response([
            'success' => true,
            'data' => InventoryItem::select([
                'title',
                'description',
                'category',
                'size',
                'color',
                'finish',
                'material',
                'part_number',
                'stock',
                'cost',
                'sale_price',
                'supplier_id',
                'id',
            ])->findOrFail($id)
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = InventoryItem::query();
        if ($request->q) {
            $items = $items
                ->where("title", "like", "%{$request->q}%")
                ->orWhere("Description", "like", "%{$request->q}%");
        }

        $filters = $request->only([
            "size",
            "color",
            "category",
            "cost",
            "sale_price",
            "material",
            "finish",
            "labour_cost",
            "minimum_stock",
            "supplier_id"
        ]);

        if ($filters) {
            foreach ($filters as $filter => $value) {
                $items = $items->where($filter, $value);
            }
        }
        return response([
            'success' => true,
            'data' => $items->get()
        ]);
    }

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
        try {
            $request->validate([
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
                "labour_cost" => "nullable|numeric|min:0",
                "minimum_stock" => "nullable|integer|min:0"
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

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
            "labour_cost",
            "minimum_stock"
        ]);

        //updating the belongsTo relationship of the supplier
        $params['supplier_id'] = $request->supplier_id ?? $inventoryItem->supplier_id;
        $inventoryItem->update($params);

        return response([
            'success' => true,
            'data' => $inventoryItem->refresh()
        ]);
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
                'title' => "required|string",
                'description' => "required|string",
                'cost' => "required|numeric|min:0",
                'sale_price' => "required|numeric|min:0",

            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

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
            "labour_cost",
            "minimum_stock"
        ]);

        $item = InventoryItem::create($params);
        $item->save();

        return response([
            'success' => true,
            'data' => $item->refresh()
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
        $inventoryItem = InventoryItem::findOrFail($id);
        $inventoryItem->delete();

        return response([
            'success' => true
        ]);
    }
}
