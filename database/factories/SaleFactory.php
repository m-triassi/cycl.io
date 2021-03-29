<?php

namespace Database\Factories;

use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Sale::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'description' => $this->faker->words(5, true),
            'client_name' => $this->faker->name,
            'status' => $this->faker->word,
            'payment_type' => $this->faker->word,
            'card_number' => $this->faker->numberBetween(11111111, 99999999) . $this->faker->numberBetween(11111111, 99999999),
            'last_four' => $this->faker->numberBetween(1111,9999),
            'cardholder_name' => $this->faker->name,
            'price' => $this->faker->numberBetween(100, 2000),
            'delivery_date' => $this->faker->dateTimeBetween("now", "+3 months"),
        ];
    }
}
