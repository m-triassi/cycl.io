<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use App\Models\InventoryItem;
use App\Models\OrderItem;
use App\Models\PurchaseOrder;

class PurchaseOrderObserverTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *
     * @test
     * @return void
     */
    public function test_order_updated_received_triggers_inventory_stock_update()
    {
        $purchaseOrder = PurchaseOrder::first();

        //Get the order items corresponding to the PurchaseOrder
        $orderItems = OrderItem::where("orderable_id", $purchaseOrder->id)->get();

        //Gather information about inventory item stock before update
        $itemQuantitiesBeforeUpdate = [];
        foreach($orderItems as $orderItem) {
            $inventoryItem = InventoryItem::find($orderItem->inventory_item_id);
            $itemQuantitiesBeforeUpdate[$orderItem->id] = $inventoryItem->stock;
        }

        //update the purchase order status, triggering the observer
        $purchaseOrder->status = PurchaseOrder::RECEIVED;
        $purchaseOrder->save();

        //Gather information about inventory item stock after update
        $itemQuantitiesAfterUpdate = [];
        foreach($orderItems as $orderItem) {
            $inventoryItem = InventoryItem::find($orderItem->inventory_item_id);
            $itemQuantitiesAfterUpdate[$orderItem->id] = $inventoryItem->stock;
        }

        //In case of multiple order items for the same inventory item, we need to account for TOTAL change (delta) to the item's stock
        $itemStockDeltas = [];
        foreach($orderItems as $orderItem) {
            if (!array_key_exists($orderItem->inventory_item_id, $itemStockDeltas))
                $itemStockDeltas[$orderItem->inventory_item_id] = $orderItem->quantity;
            else
                $itemStockDeltas[$orderItem->inventory_item_id] += $orderItem->quantity;

        }

        //compare the result to the expected difference
        foreach($orderItems as $orderItem) {
            $this->assertEquals(
                $itemStockDeltas[$orderItem->inventory_item_id],
                $itemQuantitiesAfterUpdate[$orderItem->id] - $itemQuantitiesBeforeUpdate[$orderItem->id]
            );
        }
    }
}
