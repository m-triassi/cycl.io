<?php

namespace Database\Seeders;

use App\Models\InventoryItem;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        // Always create the same user every time for testing purposes
        User::create([
            'name' => "Example User",
            'email' => "user@example.com",
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ]);
         User::factory(10)->create();
         InventoryItem::factory(25)->create();
         Supplier::factory(5)->create();
    }
}
