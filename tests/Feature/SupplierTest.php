<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\InventoryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class SupplierTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *
     * @test
     * @return void
     */
    public function test_supplier_can_be_indexed()
    {
        $user = User::first();
        $suppliers = $this->actingAs($user)->get('/supplier');
        $supplierData = $suppliers->getOriginalContent();

        $ids = $supplierData['data']->pluck('id');

        $suppliers->assertStatus(200);
        $this->assertTrue($supplierData["success"]);
        $this->assertContains(1, $ids);
        $this->assertContains(2, $ids);
        $this->assertContains(3, $ids);
        $this->assertContains(4, $ids);
        $this->assertContains(5, $ids);
    }

    /**
     *
     * @test
     * @return void
     */
    public function test_supplier_can_be_shown()
    {
        $supplierA = Supplier::create([
            'name' => "test",
            'partnership_start_date' => "2022-08-21"
        ]);

        $itemA = InventoryItem::create([
            'title' => "this is a test",
            'supplier_id' => $supplierA->id,
            'description' => "This items will be a test item",
            'cost' => 9.99,
            'sale_price' => 19.99,
            'size' => "testSize"
        ]);

        $user = User::first();
        $supplier = $this->actingAs($user)->get("/supplier/$supplierA->id");
        $supplierData = $supplier->getOriginalContent();

        $supplierIds = $supplierData['data']->pluck("id");

        $supplier->assertStatus(200);
        $this->assertTrue($supplierData["success"]);
        $this->assertContains($supplierA->id, $supplierIds);
    }
}
