<?php

namespace Tests\Feature;

use App\Models\PurchaseOrder;
use App\Models\Supplier;
use App\Models\InventoryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PurchaseOrderItemTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *
     * @test
     * @return void
     */
    public function test_items_can_be_updated_with_array()
    {
        $user = User::first();
        $attached = $this->actingAs($user)->put('/purchase-order/orderables/1', [
            'item_ids' => [19, 20]
        ]);

        $expectedItems = InventoryItem::findMany([19, 20]);

        $attachedData = $attached->getOriginalContent();

        $pivotData = $attachedData['data'];

        $this->assertCount(2, $pivotData);

        $actualItems = InventoryItem::findMany([$pivotData[0]->id, $pivotData[1]->id]);

        $attached->assertStatus(200);
        $this->assertTrue($attachedData['success']);
        $this->assertEquals($expectedItems, $actualItems);
    }

    /**
     *
     * @test
     * @return void
     */
    public function test_items_can_be_updated_with_string()
    {
        $user = User::first();
        $attached = $this->actingAs($user)->put('/purchase-order/orderables/1', [
            'item_ids' => "17,18"
        ]);

        $expectedItems = InventoryItem::findMany([17, 18]);

        $attachedData = $attached->getOriginalContent();

        $pivotData = $attachedData['data'];

        $this->assertCount(2, $pivotData);

        $actualItems = InventoryItem::findMany([$pivotData[0]->id, $pivotData[1]->id]);

        $attached->assertStatus(200);
        $this->assertTrue($attachedData['success']);
        $this->assertEquals($expectedItems, $actualItems);
    }
}
