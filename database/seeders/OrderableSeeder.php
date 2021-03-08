<?php

namespace Database\Seeders;

use App\Models\InventoryItem;
use App\Models\PurchaseOrder;
use Illuminate\Database\Seeder;

class OrderableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (PurchaseOrder::all() as $purchaseOrder) {
            $randomItems = [];
            for ($i = 0; $i < rand(1, 10); $i++) {
                $randomItems[] = ['inventory_item_id' => InventoryItem::inRandomOrder()->first()->id, 'quantity' => rand(0, 30)];
            }
            $purchaseOrder->order_items()->sync($randomItems);
        }
    }
}
