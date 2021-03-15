<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\InventoryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SupplierItemTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *
     * @test
     * @return void
     */
    public function test_item_can_be_attached()
    {
        $user = User::first();
        $attached = $this->actingAs($user)->post('/supplier/items', [
            'supplier_id' => 3,
            'item_id' => 1
        ]);
        $attachedData = $attached->getOriginalContent();

        $attached->assertStatus(200);
        $this->assertTrue($attachedData['success']);
        $this->assertTrue(InventoryItem::find(1)->supplier_id == 3);
    }
}
