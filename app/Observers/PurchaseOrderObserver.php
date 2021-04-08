<?php

namespace App\Observers;

use App\Models\InventoryItem;
use App\Models\OrderItem;
use App\Models\PurchaseOrder;

class PurchaseOrderObserver
{
    /**
     * Handle the PurchaseOrder "updated" event.
     *
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return void
     */
    public function updated(PurchaseOrder $purchaseOrder)
    {
        //check that status is received
        if ($purchaseOrder->status == PurchaseOrder::RECEIVED)
        {
            //Get the order items corresponding to the PurchaseOrder
            $orderItems = OrderItem::where("orderable_id", $purchaseOrder->id)->get();

            //Modify the inventory item for each order item
            foreach ($orderItems as $orderItem) {
                $inventoryItem = InventoryItem::find($orderItem->inventory_item_id);
                $inventoryItem->stock = $inventoryItem->stock + $orderItem->quantity;
                $inventoryItem->save();
            }
        }
    }
}
