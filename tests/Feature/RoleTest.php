<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use DatabaseTransactions;
    /**
     *
     * @test
     * @return void
     */
    public function test_roles_can_be_created()
    {
        $effector = User::first();
        $before = Role::count();

        // passes validation
        $valid = $this->actingAs($effector)->post('/roles', [
            'title' => "new Role",
            'type' => 'newRole',
            'description' => "Description of the Role"
        ]);
        $validData = $valid->getOriginalContent();

        $after = Role::count();

        $valid->assertStatus(200);
        $this->assertTrue($validData['success']);
        $this->assertEquals($before + 1, $after);

        // fails validation
        $invalid = $this->actingAs($effector)->post('/roles', [
            'title' => "new Role",
            'description' => "Description of the Role"
        ]);
        $invalidData = $invalid->getOriginalContent();

        $this->assertFalse($invalidData['success']);
        $this->assertArrayHasKey('type', $invalidData['errors']);

    }
}
