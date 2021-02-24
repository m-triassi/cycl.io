<?php

namespace Tests\Feature;

use App\Models\InventoryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MaterialTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *
     * @test
     * @return void
     */
    public function test_materials_and_assemblies_can_be_listed()
    {
        InventoryItem::first()->materials()->sync([2, 3, 4, 5]);

        $user = User::first();
        $materials = $this->actingAs($user)->get('/materials');
        $materialData = $materials->getOriginalContent();

        $ids = $materialData['data']->pluck('id');

        $materials->assertStatus(200);
        $this->assertTrue($materialData["success"]);
        $this->assertContains(2, $ids);
        $this->assertContains(3, $ids);
        $this->assertContains(4, $ids);
        $this->assertContains(5, $ids);

        $assemblies = $this->actingAs($user)->get('/materials?is_assembly=1');
        $assembliesData = $assemblies->getOriginalContent();

        $assemblies->assertStatus(200);
        $this->assertTrue($assembliesData["success"]);
        $ids = $assembliesData['data']->pluck('id');
        $this->assertContains(1, $ids);
    }

    /**
     * @test
     * @return void
     */
    public function test_bills_can_be_stored()
    {
        $user = User::first();
        $arrays = $this->actingAs($user)->post('/materials', [
            'assembly_id' => 1,
            'material_ids' => [2, 3]
        ]);
        $arrayData = $arrays->getOriginalContent();

        $arrays->assertStatus(200);
        $this->assertTrue($arrayData['success']);

        $ids = $arrayData['data']->pluck('id');

        $this->assertContains(2, $ids);
        $this->assertContains(3, $ids);


        $strings = $this->actingAs($user)->post('/materials', [
            'assembly_id' => 1,
            'material_ids' => "4, 5"
        ]);
        $stringsData = $strings->getOriginalContent();

        $strings->assertStatus(200);
        $this->assertTrue($stringsData['success']);

        $ids = $stringsData['data']->pluck('id');

        $this->assertContains(4, $ids);
        $this->assertContains(5, $ids);
    }

    /**
     *
     * @test
     * @return void
     */
    public function test_materials_can_be_shown()
    {
        InventoryItem::first()->materials()->sync([2, 3, 4, 5]);

        $user = User::first();
        $materials = $this->actingAs($user)->get('/materials');
        $materialData = $materials->getOriginalContent();

        $ids = $materialData['data']->pluck('id');

        $materials->assertStatus(200);
        $this->assertTrue($materialData["success"]);
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
    public function test_materials_can_be_updated()
    {
        $itemA = InventoryItem::first();
        $user = User::first();

        $arrays = $this->actingAs($user)->put("/materials/{$itemA->id}", [
            'material_ids' => [2, 3]
        ]);
        $arrayData = $arrays->getOriginalContent();


        $arrays->assertStatus(200);
        $this->assertTrue($arrayData['success']);

        $ids = $arrayData['data']->pluck('id');

        $this->assertContains(2, $ids);
        $this->assertContains(3, $ids);

        $strings = $this->actingAs($user)->put("/materials/{$itemA->id}", [
            'material_ids' => "4, 5"
        ]);
        $stringsData = $strings->getOriginalContent();

        $strings->assertStatus(200);
        $this->assertTrue($stringsData['success']);

        $ids = $stringsData['data']->pluck('id');

        $this->assertContains(4, $ids);
        $this->assertContains(5, $ids);
    }
}
