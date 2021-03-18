<?php

namespace Database\Factories;

use App\Models\InventoryItem;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

class InventoryItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = InventoryItem::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'supplier_id' => Supplier::inRandomOrder()->first(),
            'title' => $this->faker->word,
            'description' => $this->faker->text,
            'cost' => $this->faker->randomFloat(2, 0, 10000),
            'sale_price' => $this->faker->randomFloat(2, 0, 10000),
            'stock' => $this->faker->numberBetween(1,9),
            'category' => $this->faker->word,
            'size' => $this->faker->word,
            'color' => $this->faker->colorName,
            'finish' => $this->faker->word,
            'material' => $this->faker->word,
            'part_number' => $this->faker->shuffle('abcdefghigj1234567891234567'), 
            'minimum_stock' => 2,
        ];
    }
}
