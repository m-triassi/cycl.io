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

    /**
     *
     * @test
     * @return void
     */
    public function test_supplier_can_be_stored()
    {
        // Make sure we're redirected if we try to store without authentication
        $redirected = $this->post('/supplier', [
            'name' => "supplier0",
            'partnership_start_date' => "2021-03-18",
        ]);

        $redirected->assertStatus(302);

        $user = User::first();

        $suppliersBefore = Supplier::count();
        // Try proper inputs; name and partnership start date only
        $proper = $this->actingAs($user)->post('/supplier', [
            'name' => "supplier1",
            'partnership_start_date' => "2021-03-18",
        ]);

        // Did we succeed?
        $proper->assertStatus(200);
        $properData = $proper->getOriginalContent();
        $this->assertTrue($properData['success']);
        $this->assertEquals($suppliersBefore + 1, Supplier::count());



        $suppliersBefore = Supplier::count();
        // Try proper inputs; name, partnership start date and end date
        $proper = $this->actingAs($user)->post('/supplier', [
            'name' => "supplier1",
            'partnership_start_date' => "2021-03-19",
            'partnership_end_date' => "2021-03-20",
        ]);

        // Did we succeed?
        $proper->assertStatus(200);
        $properData = $proper->getOriginalContent();
        $this->assertTrue($properData['success']);
        $this->assertEquals($suppliersBefore + 1, Supplier::count());

        // Try improper inputs,  name, no partnership start date
        $improper = $this->actingAs($user)->post('/supplier', [
            'name' => "supplier3",
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);

        // Try improper inputs, name, start date, and end date but end date precedes start date
        $improper = $this->actingAs($user)->post('/supplier', [
            'name' => "supplier3",
            'partnership_start_date' => "2021-03-20",
            'partnership_end_date' => "2021-03-19",
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
    public function test_supplier_can_be_updated()
    {
        $testSupplier = Supplier::create([
            'name' => 'test supplier',
            'partnership_start_date' => "2021-03-19",
            'partnership_end_date' => "2021-03-20",
        ]);

        // make sure we're redirected
        $redirected = $this->put("/supplier/$testSupplier->id", [
            'name' => "redirect test supplier"
        ]);

        $redirected->assertStatus(302);


        $user = User::first();
        // improper update, supplier partnership end date does not precede partnership start date
        $updated = $this->actingAs($user)->put("/supplier/$testSupplier->id", [
            'partnership_end_date' => "2021-03-18",
        ]);

        $this->assertEquals($testSupplier->partnership_end_date, "2021-03-20");


        // check that supplier gets updated properly
        $updated = $this->actingAs($user)->put("/supplier/$testSupplier->id", [
            'name' => "test supplier 2.0",
            'partnership_start_date' => "2021-03-16",
        ]);
        $updatedData = $updated->getOriginalContent();

        $updated->assertStatus(200);
        $this->assertNotEquals($testSupplier, $updatedData['data']);
        $this->assertEquals("test supplier 2.0", $updatedData['data']->name);
        $this->assertEquals("2021-03-16", $updatedData['data']->partnership_start_date);
    }

}
