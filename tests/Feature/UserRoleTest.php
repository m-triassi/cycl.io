<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserRoleTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *
     * @test
     * @return void
     */
    public function test_role_can_be_attached()
    {
        $user = User::first();
        $attached = $this->actingAs($user)->post('/user/roles', [
            'role_ids' => 1,
            'user_id' => 2
        ]);
        $attachedData = $attached->getOriginalContent();

        $attached->assertStatus(200);
        $this->assertTrue($attachedData['success']);
        $this->assertTrue(User::find(2)->hasRole(Role::ADMIN));
    }

    public function test_roles_can_be_detached()
    {
        $effector = User::first();
        $user = User::find(2);
        $user->roles()->sync([1]);
        $user->refresh();

        $this->assertTrue($user->hasRole(Role::ADMIN));

        $deleted = $this->actingAs($effector)->delete('/user/roles', [
            'user_id' => 2,
            'role_ids' => 1
        ]);
        $deletedData = $deleted->getOriginalContent();
        $user = $user->refresh();

        $deleted->assertStatus(200);
        $this->assertTrue($deletedData['success']);
        $this->assertFalse($user->isAdmin());

    }
}
