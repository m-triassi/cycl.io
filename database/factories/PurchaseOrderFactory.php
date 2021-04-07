<?php

namespace Database\Factories;

use App\Models\PurchaseOrder;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

class PurchaseOrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PurchaseOrder::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $statuses = [PurchaseOrder::PENDING, PurchaseOrder::SHIPPED, PurchaseOrder::PAID, PurchaseOrder::CANCELLED];

        return [
            'supplier_id' => Supplier::inRandomOrder()->first(),
            'delivery_date' => $this->faker->dateTimeBetween('now', '+3 months'),
            'status' => $statuses[$this->faker->numberBetween(0, 3)]
        ];
    }
}
