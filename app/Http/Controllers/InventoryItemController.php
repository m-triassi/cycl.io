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

    /**
     * Show details of selected Item
     *
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show($id)
    {
        // Return a formatted response with columns required by the front end in a specific order
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
                'minimum_stock',
                'cost',
                'sale_price',
                'supplier_id',
                'id',
            ])->findOrFail($id)
        ]);
    }

    /**
     * Display a listing of the item.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Begin building your query to add filters
        $items = InventoryItem::query();

        if ($request->q) {
            // add a fuzzy search if the "q" parameter is included in the request body
            $items = $items
                ->where("title", "like", "%{$request->q}%")
                ->orWhere("Description", "like", "%{$request->q}%");
        }

        // fetch the remaining filters from the request body
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
            // if filters is not empty, iterate over the array and apply each filter as a where clause
            foreach ($filters as $filter => $value) {
                $items = $items->where($filter, $value);
            }
        }

        // send the response
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
            // Validate that the incoming data is formatted correctly as it will be inserted to our DB
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
            // if there is a failure, report that in the form of a formatted response with errors
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // find the inventory item or 404 if it doesn't exist
        $inventoryItem = InventoryItem::findOrFail($id);

        // grab all the assignable data for update
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

        // Send a repsonse reporting success to the front end
        return response([
            'success' => true,
            'data' => $inventoryItem->refresh()
        ]);
    }

    /**
     * Store a newly created item in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Validate that the incoming data is formatted correctly as it will be inserted to our DB
            $request->validate([
                'title' => "required|string",
                'description' => "required|string",
                'cost' => "required|numeric|min:0",
                'sale_price' => "required|numeric|min:0",

            ]);
        } catch (ValidationException $e) {
            // if there is a failure, report that in the form of a formatted response with errors
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // grab data to be inserted into the database
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

        // create the inventory item
        $item = InventoryItem::create($params);
        $item->save();

        // send a response reporting success
        return response([
            'success' => true,
            'data' => $item->refresh()
        ]);
    }

    /**
     * Remove the specified item from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // find the item to be deleted
        $inventoryItem = InventoryItem::findOrFail($id);
        // delete the item
        $inventoryItem->delete();

        return response([
            'success' => true
        ]);
    }
}
