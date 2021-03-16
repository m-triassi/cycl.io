<?php

namespace Tests\Unit;

use App\Models\OrderItem;
use App\Models\PurchaseOrder;
use App\Models\User;
use App\Models\InventoryItem;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class InventoryItemObserverTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Testing the auto order functionality on inventory item update
     *
     * @return void
     */
    public function test_minimum_stock_auto_order()
    {
        $item = InventoryItem::create([
            'title' => "observer test",
            'description' => "This ites will be a test item",
            'cost' => 9.99,
            'sale_price' => 19.99,
            'supplier_id' => 4,
            'minimum_stock' => 4,
            'stock'=>8,
        ]);
        $item->save();

        //Verifying count of purchase orders and orderables before updating inventory
        $purchaseOrdersBefore = PurchaseOrder::count();
        $orderablesBefore = OrderItem::count();

        //Demonstrating orderable does not exist before updating inventory item
        $this->assertNotEquals(OrderItem::where('inventory_item_id',$item->id)->exists(), true);

        //Triggering the InventoryItemObserver by updating an inventory item
        $item->stock = 1;
        $item->save();

        //Did it work? Have PurchaseOrder and Orderables table been updated?
        $this->assertEquals($purchaseOrdersBefore+1, PurchaseOrder::count());
        $this->assertEquals($orderablesBefore+1, OrderItem::count());
        $this->assertEquals(OrderItem::where('inventory_item_id',$item->id)->exists(), true);
    }
}
