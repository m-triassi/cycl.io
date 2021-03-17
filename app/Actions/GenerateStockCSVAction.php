<?php


namespace App\Actions;


use App\Models\InventoryItem;

class GenerateStockCSVAction
{
    public function __invoke() : string
    {
        $lowStock = InventoryItem::with('supplier')->belowMinimum()->get();
        $rows = $lowStock->map(function ($item) {
            $row = $item->only(['title', 'cost', 'stock', 'minimum_stock']);
            $row[] = $item->supplier->name;
            return implode(",", $row);
        });
        $rows->prepend('Title,Cost,Current Stock,Minimum Stock,Supplier Name');
        return $rows->implode(PHP_EOL);
    }
}
