<?php

namespace App\Observers;

use App\Models\InventoryItem;
use App\Models\OrderItem;
use App\Models\PurchaseOrder;

class PurchaseOrderObserver
{
    /**
     * Handle the PurchaseOrder "created" event.
     *
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return void
     */
    public function created(PurchaseOrder $purchaseOrder)
    {
        //
    }

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

    /**
     * Handle the PurchaseOrder "deleted" event.
     *
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return void
     */
    public function deleted(PurchaseOrder $purchaseOrder)
    {
        //
    }

    /**
     * Handle the PurchaseOrder "restored" event.
     *
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return void
     */
    public function restored(PurchaseOrder $purchaseOrder)
    {
        //
    }

    /**
     * Handle the PurchaseOrder "force deleted" event.
     *
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return void
     */
    public function forceDeleted(PurchaseOrder $purchaseOrder)
    {
        //
    }
}
