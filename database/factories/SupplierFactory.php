<?php

namespace Database\Factories;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

class SupplierFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Supplier::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $delays = [Supplier::DELAY_60, Supplier::DELAY_30, Supplier::DELAY_NONE];
        return [
            'name' => $this->faker->name(),
            'payment_delay' => $delays[$this->faker->numberBetween(0, 2)],
            'partnership_start_date' => $this->faker->dateTimeBetween("-2 years", "now"),
            'partnership_end_date' => $this->faker->dateTimeBetween("now", "+5 years")
        ];
    }
}
