<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    /**
     * Store a newly created user role in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Find all the roles to be attached to the user
        $roles = Role::findMany($this->stringToArray($request->role_ids));
        $user = User::findOrFail($request->user_id);

        // attach the roles to the user
        $user->roles()->attach($roles);
        $user->save();

        return response([
            'success' => true,
            'data' => $user->refresh()->roles
        ]);
    }

    /**
     * Remove the specified user role from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        // find the roles to be detached
        $roles = Role::findMany($this->stringToArray($request->role_ids));
        $user = User::findOrFail($request->user_id);

        // detach the found roles
        $user->roles()->detach($roles);
        $user->save();

        return response([
            'success' => true,
            'data' => $user->refresh()->roles
        ]);
    }

}
