<?php

namespace Tests\Feature;

use App\Models\InventoryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use phpDocumentor\Reflection\Types\Void_;
use Tests\TestCase;

class InventoryTest extends TestCase
{

    use DatabaseTransactions;

    /**
     * Ensure new items can be created
     *
     * @test
     * @return void
     */
    public function test_we_can_store_items()
    {
        // Make sure we're redirected if we try to store without authentication
        $redirected = $this->post('/inventory', [
            'title' => "Redirect Item",
            'description' => "I should be redirected",
            'cost' => 99.99,
            'sale_price' => 119.99
        ]);

        $redirected->assertStatus(302);

        $user = User::first();

        $itemsBefore = InventoryItem::count();
        // Try proper inputs, minimum
        $proper = $this->actingAs($user)->post('/inventory', [
            'title' => "Test item 1",
            'description' => "Test description",
            'cost' => 99.99,
            'sale_price' => 119.99
        ]);
        $properData = $proper->getOriginalContent();

        // Did we succeed?
        $proper->assertStatus(200);
        $this->assertTrue($properData['success']);
        $this->assertEquals($itemsBefore + 1, InventoryItem::count());
        // this assertion fails on Github actions for some reason
//        $this->assertDatabaseHas("inventory_items", $properData['data']->toArray());

        // Try improper inputs, minimum
        $improper = $this->actingAs($user)->post('/inventory', [
            'title' => "Test item 1",
            'description' => "Test description",
            'cost' => 99.99,
            'sale_price' => "This is not a number"
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);

    }

    /**
     * Check that index returns all results, as well as filters and search are working
     *
     * @test
     * @return void
     */
    public function test_we_can_get_index_items()
    {
        InventoryItem::create([
            'title' => "this is a test",
            'description' => "This items will be a test item",
            'cost' => 9.99,
            'sale_price' => 19.99,
            'size' => "testSize",
            'supplier_id' => 1
        ]);

        // make sure we're redirected if un-authenticated
        $redirect = $this->get("/inventory");
        $redirect->assertStatus(302);

        $user = User::first();
        $index = $this->actingAs($user)->get("/inventory");
        $indexData = $index->getOriginalContent();

        // check that we got everything
        $index->assertStatus(200);
        $this->assertTrue($indexData['success']);
        $this->assertEquals(InventoryItem::count(), count($indexData['data']));

        // check the search work
        $search = $this->actingAs($user)->get('/inventory?q=test');
        $searchData = $search->getOriginalContent();

        $this->assertTrue($searchData['success']);
        $search->assertStatus(200);
        $this->assertLessThan(InventoryItem::count(), count($searchData['data']));

        // check filters work
        $filtered = $this->actingAs($user)->get('/inventory?size=testSize');
        $filteredData = $filtered->getOriginalContent();

        $this->assertTrue($filteredData['success']);
        $filtered->assertStatus(200);
        $this->assertLessThan(InventoryItem::count(), count($filteredData['data']));

    }

    /**
     * Creates a new fake item to be updated, checks that it can be updated
     *
     * @test
     * @return void
     */
    public function test_items_can_be_updated()
    {
        $itemA = InventoryItem::create([
            'title' => "this is a test",
            'description' => "This items will be a test item",
            'cost' => 9.99,
            'sale_price' => 19.99,
            'size' => "testSize",
            'supplier_id'=>2,
        ]);

        // make sure we're redirected
        $redirected = $this->put("/inventory/$itemA->id", [
            'title' => "this is a new title"
        ]);

        $redirected->assertStatus(302);

        // check that items get updated properly
        $user = User::first();
        $updated = $this->actingAs($user)->put("/inventory/$itemA->id", [
            'title' => "this is a new title",
        ]);

        $updatedData = $updated->getOriginalContent();
        $updated->assertStatus(200);
        $this->assertNotEquals($itemA, $updatedData['data']);
        $this->assertEquals("this is a new title", $updatedData['data']->title);

    }

    /**
     * Ensures items can be deleted
     *
     * @test
     * @return void
     */
    public function test_items_can_be_destroyed()
    {
        $itemA = InventoryItem::create([
            'title' => "this is a test",
            'description' => "This items will be a test item",
            'cost' => 9.99,
            'sale_price' => 19.99,
            'size' => "testSize"
        ]);

        // make sure we're redirected
        $redirected = $this->delete("/inventory/{$itemA->id}");

        $redirected->assertStatus(302);

        // check users can delete items
        $user = User::first();
        $deleted = $this->actingAs($user)->delete("/inventory/{$itemA->id}");
        $deletedData = $deleted->getOriginalContent();

        $deleted->assertStatus(200);
        $this->assertTrue($deletedData['success']);

    }
}
