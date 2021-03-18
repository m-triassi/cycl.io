<?php

namespace Tests\Feature;

use App\Models\PurchaseOrder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PurchaseOrderTest extends TestCase
{
    /**
     *
     * @test
     * @return void
     */
    public function test_purchase_order_can_be_stored()
    {
        // Make sure we're redirected if we try to store without authentication
        $redirected = $this->post('/purchase-order', [
            'supplier_id' => "1",
            'status' => "pending",
            'delivery_date' => "2021-04-05",
        ]);

        $redirected->assertStatus(302);

        $user = User::first();

        $purchaseOrdersBefore = PurchaseOrder::count();
        // Try proper inputs
        $proper = $this->actingAs($user)->post('/purchase-order', [
            'supplier_id' => "1",
            'status' => "pending",
            'delivery_date' => "2021-04-05",
        ]);

        // Did we succeed?
        $proper->assertStatus(200);
        $properData = $proper->getOriginalContent();
        $this->assertTrue($properData['success']);
        $this->assertEquals($purchaseOrdersBefore + 1, PurchaseOrder::count());


        // Try improper inputs, invalid status
        $improper = $this->actingAs($user)->post('/purchase-order', [
            'supplier_id' => "1",
            'status' => "not here yet",
            'delivery_date' => "2021-04-05",
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);


        // Try improper inputs, date preceding a day in the past
        $improper = $this->actingAs($user)->post('/purchase-order', [
            'supplier_id' => "1",
            'status' => "pending",
            'delivery_date' => "2020-04-05",
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);
    }


    /**
     *
     * @test
     * @return void
     */
    public function test_purchase_order_can_be_updated()
    {
        $purchaseOrder = PurchaseOrder::create([
            'supplier_id' => "1",
            'status' => "pending",
            'delivery_date' => "2021-04-05",
        ]);

        // make sure we're redirected
        $redirected = $this->put("/purchase-order/$purchaseOrder->id", [
            'supplier_id' => "2",
        ]);

        $redirected->assertStatus(302);


        $user = User::first();
        // proper update, supplier partnership end date does not precede partnership start date
        $updated = $this->actingAs($user)->put("/purchase-order/$purchaseOrder->id", [
            'supplier_id' => "2",
            'status' => "received",
            'delivery_date' => "2021-04-18 12:30:00",
        ]);
        $updatedData = $updated->getOriginalContent();

        $updated->assertStatus(200);
        $this->assertNotEquals($purchaseOrder, $updatedData['data']);
        $this->assertEquals("2", $updatedData['data']->supplier_id);
        $this->assertEquals("received", $updatedData['data']->status);
        $this->assertEquals("2021-04-18 12:30:00", $updatedData['data']->delivery_date);


        // improper update, invalid status
        $updated = $this->actingAs($user)->put("/purchase-order/$purchaseOrder->id", [
            'status' => "still not here yet??",
        ]);
        $this->assertEquals($purchaseOrder->status, "pending");


        // improper update, invalid delivery date
        $updated = $this->actingAs($user)->put("/purchase-order/$purchaseOrder->id", [
            'delivery_date' => "2020-04-18",
        ]);
        $this->assertEquals($purchaseOrder->delivery_date,"2021-04-05");
    }

    public function test_purchase_orders_can_be_indexed()
    {
        $user = User::first();
        $index = $this->actingAs($user)->get('/purchase-order');
        $indexData = $index->getOriginalContent();

        $index->assertStatus(200);
        $this->assertTrue($indexData['success']);
        $this->assertCount(PurchaseOrder::count(), $indexData['data']);
    }


    public function test_purchase_order_can_be_shown()
    {
        $user = User::first();
        $shown = $this->actingAs($user)->get('/purchase-order/1');
        $shownData = $shown->getOriginalContent();

        $shown->assertStatus(200);
        $this->assertTrue($shownData['success']);
        $orderA = PurchaseOrder::find(1);
        $this->assertEquals($orderA, $shownData['data']);
    }
}
