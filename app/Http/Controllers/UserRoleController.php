<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $roles = Role::findMany($this->stringToArray($request->role_ids));
        $user = User::findOrFail($request->user_id);
        $user->roles()->attach($roles);
        $user->save();

        return response([
            'success' => true,
            'data' => $user->refresh()->roles
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $roles = Role::findMany($this->stringToArray($request->role_ids));
        $user = User::findOrFail($request->user_id);
        $user->roles()->detach($roles);
        $user->save();

        return response([
            'success' => true,
            'data' => $user->refresh()->roles
        ]);
    }

    /**
     * @param $input
     * @return array
     */
    private function stringToArray($input) : array
    {
        return is_string($input) ? explode(',', str_replace(" ", "", $input))
            : (array) $input;
    }
}
