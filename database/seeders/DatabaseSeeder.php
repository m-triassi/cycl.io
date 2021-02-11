<?php

namespace Database\Seeders;

use Database\Factories\InventoryItemFactory;
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
        // Always create the same user every time for testing purposes
        \App\Models\User::create([
            'name' => "Example User",
            'email' => "user@example.com",
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ]);
         \App\Models\User::factory(10)->create();
         \App\Models\InventoryItem::factory(25)->create();
    }
}
