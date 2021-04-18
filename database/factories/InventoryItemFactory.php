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

    private $items = [
        'Axle' => 'A rod connects a wheel to a bicycle and supports bearings which allow the wheel to rotate.',
        'Basket' => 'Carries items.',
        'Bearing' => 'Ball that allows smooth rotation along axle.',
        'Bell' => 'Produces a sound to warn pedestrians and other cyclists.',
        'Bottle Cage' => 'Holds a water bottle.',
        'Bottom Bracket' => 'The system that the pedals rotate around.',
        'Brake' => 'Devices used to decelerate the bicycle.',
        'Brake Lever' => 'A lever for controlling a bicycle brake.',
        'Cable Guide' => 'A guide for a cable.',
        'Cable' => 'A metal cable used to control braking or gear changing.',
        'Chain' => 'A system of interlinking pins and metal plates used to turn gears.',
        'Derailleur' => 'A system of levers that allows for changing gears.',
        'Fender' => 'Curved piece of material to block debris picked up by tires.',
        'Fork' => 'Attaches front wheel to frame.',
        'Frame' => 'Core of the bicycle upon which all other parts are attached.',
        'Freewheel' => 'A ratcheting assembly that uses multiple gears to allow speed changing.',
        'Handlebar' => 'Bar attached to frame for cyclist to hold on to.',
        'Hub' => 'Core of the wheel system.',
        'Inner Tube' => 'Inflatable tube used for tires.',
        'Kickstand' => 'Stand for the bicycle to rest upon.',
        'Pedal' => 'Allows cyclist to provide power to the bicycle mechanism.',
        'Reflector' => 'Reflects light to increase visibility of the bicycle.',
        'Seat' => 'Seat upon which the bicyclist can sit.',
        'Seat Post' => 'Post that attaches seat to frame.',
        'Shifter' => 'Controls gear speed',
        'Spoke' => 'Rod that attached wheel rim to hub',
        'Tire' => 'Protective rubber layer that adds traction to wheel.',
        'Wheel' => 'Wheel'
    ];

    private $categories = [
        'Aesthetic',
        'Functional',
        'Safety'
    ];

    private $finishes = [
        'Chrome',
        'Matte',
        'Carbon fiber',
        'Gloss',
        'Rubber'
    ];

    private $materials = [
        'Aluminium',
        'Carbon Fiber',
        'Rubber',
        'Plastic'
    ];

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $items = $this->items;
        $categories = $this->categories;
        $materials = $this->materials;
        $finishes = $this->finishes;

        $item = array_rand($items);

        $lead_time = rand(1, 24);

        return [
            'supplier_id' => Supplier::inRandomOrder()->first(),
            'title' => $item,
            'description' => $items[$item],
            'cost' => $this->faker->randomFloat(2, 0, 100),
            'sale_price' => $this->faker->randomFloat(2, 0, 200),
            'stock' => $this->faker->numberBetween(1,100),
            'category' => $categories[array_rand($categories)],
            'size' => rand(1,100).'cmX'.rand(1,100).'cmX'.rand(1,100).'cm',
            'color' => $this->faker->colorName,
            'finish' => $finishes[array_rand($finishes)],
            'material' => $materials[array_rand($materials)],
            'part_number' => $this->faker->shuffle('abcdefghigj1234567891234567'),
            'lead_time' => $lead_time,
            'labour_cost' => $lead_time*20.15,
            'minimum_stock' => 2,
        ];
    }
}
