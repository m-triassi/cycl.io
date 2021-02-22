<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new Role();
        $admin->type = Role::ADMIN;
        $admin->title = 'Administrator';
        $admin->description = 'Universal site access';
        $admin->save();
    }
}
