<?php

namespace Tests\Feature;

use App\Models\InventoryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AvailbleMaterialTest extends TestCase
{
    use DatabaseTransactions;
    
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_available_materials_is_filtered_properly()
    {
        // attach some materials to Item 1
        InventoryItem::find(1)->materials()->sync([2, 3, 4]);

        $user = User::first();
        $response = $this->actingAs($user)->get('/materials/available?item_id=1');

        $response->assertStatus(200);
        $responseData = $response->getOriginalContent();

        $this->assertEmpty(array_intersect([1, 2, 3, 4], $responseData['data']->pluck('id')->toArray()));
    }
}
