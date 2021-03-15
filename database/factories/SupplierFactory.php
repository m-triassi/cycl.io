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
        return [
            'name' => $this->faker->words(2, true),
            'partnership_start_date' => $this->faker->dateTimeBetween("-2 years", "now"),
            'partnership_end_date' => $this->faker->dateTimeBetween("now", "+5 years")
        ];
    }
}
