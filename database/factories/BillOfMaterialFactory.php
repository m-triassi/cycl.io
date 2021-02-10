<?php

namespace Database\Factories;

use App\Models\BillOfMaterial;
use Illuminate\Database\Eloquent\Factories\Factory;

class BillOfMaterialFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = BillOfMaterial::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $assem = $this->faker->numberBetween(1, 12);
        $mat = $this->faker->numberBetween(13, 25);
        $bill = BillOfMaterial::where('assembly_id', $assem)
            ->where('material_id', $mat)
            ->first();

        if ($bill) {
            return [
                'assembly_id' => $assem,
                'material_id' => $mat
            ];
        }
        return [];
    }
}
