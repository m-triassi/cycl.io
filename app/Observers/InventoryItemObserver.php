<?php

namespace App\Observers;

use App\Models\InventoryItem;
use App\Models\OrderItem;
use App\Models\PurchaseOrder;

class InventoryItemObserver
{
    /**
     * Handle the InventoryItem "updated" event.
     *
     * @param  \App\Models\InventoryItem  $inventoryItem
     * @return void
     */
    public function updated(InventoryItem $inventoryItem)
    {
        //Check if item is below stock
        if($inventoryItem->is_below_minimum) {
            //Check if there is an existing order for said inventory item
            if(!OrderItem::where('inventory_item_id',$inventoryItem->id)->exists())
            {
                //Create purchase order to specified supplier
                $purchaseOrder = PurchaseOrder::create([
                    'supplier_id' => $inventoryItem->supplier_id,
                    'status' => "pending",
                ]);

                $purchaseOrder->save();


                //Create orderables for the created purchase order
                $orderItem = OrderItem::create([
                    'orderable_type' => 'App\Models\PurchaseOrder',
                    'orderable_id' => $purchaseOrder->id,
                    'inventory_item_id' => $inventoryItem->id,
                    'quantity' => $inventoryItem->minimum_stock +15,
                ]);

                $orderItem->save();
            }
        }
    }
}
